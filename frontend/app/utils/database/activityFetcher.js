import FormData from "form-data";
import { activityLog, userLog } from "../logger/config";
import axiosInstance, { HOST } from "./axiosConfig";
import { getMimeType } from "../mimeType";

export async function sendActivity(activity) {
    try {
        const response = await axiosInstance.post('/activities/postActivity',
            {
                "caption": activity.caption,
                "userID": activity.user._id,
                "gameID": activity.game.ID
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        activityLog.info("Activity has been sent successfully.")
        activityLog.debug(response.data)

        activity.ID = response.data._id

        const imageName = activity.image.uri.split("/").pop()

        let data = new FormData()
        data.append('acitivityID', activity.ID)
        data.append('file', { uri: activity.image.uri, name: imageName, type: await getMimeType(activity.image.uri) })

        const response2 = await axiosInstance.put('/activities/postBeforePicture', data, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
        activityLog.info("ActivityBeforeImage has been sent successfully.")

        return activity.ID
    } catch (error) {
        activityLog.error("Activity could not be sent.", error)
    }
}

export async function sendActivityAfterImage(activity) {
    try {
        const filename = activity.image.uri.split("/").pop()

        let data = new FormData()
        data.append('acitivityID', activity.ID)
        data.append('file', { uri: activity.image.uri, name: filename, type: await getMimeType(activity.image.uri) })

        const response = await axiosInstance.put('/activities/postAfterPicture', data, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
        activityLog.info("ActivityAfterImage has been sent successfully.")
    }
    catch (error) {
        activityLog.error("ActivityAfterImage could not be sent.", error)
    }
}

export async function fetchActivity(user) {
    try {
        const response = await axiosInstance.get(`/homepage/${user._id}`)
        activityLog.debug("Activity has been fetched successfully.")

        return response.data
    } catch (error) {
        activityLog.error("Activity could not be fetched.", error)
    }
}

export async function fetchActivityFromUser(user) {
    try {
        const response = await axiosInstance.get(`/activities/getActivitiesFromUser/${user._id}`)
        activityLog.debug("Activity has been fetched successfully.")

        return response.data
    } catch (error) {
        activityLog.error("Activity could not be fetched.", error)
    }
}

export function fetchActivityPicture(activity, refreshDate, isBeforeImage) {
    if (!refreshDate) refreshDate = friend.lastLogin

    if (isBeforeImage) {
        try {
            const endPoint = `${HOST}/static/beforePicture/compressed1080/${getActivityFileName(activity.beforeImage)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    } else {
        try {
            const endPoint = `${HOST}/static/afterPicture/compressed1080/${getActivityFileName(activity.afterImage)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    }
}

export function fetchActivityPictureCompressed(activity, refreshDate, isBeforeImage) {
    if (!refreshDate) refreshDate = friend.lastLogin

    if (isBeforeImage) {
        try {
            const endPoint = `${HOST}/static/beforePicture/compressed80/${getActivityFileName(activity.beforeImage)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    } else {
        try {
            const endPoint = `${HOST}/static/afterPicture/compressed80/${getActivityFileName(activity.afterImage)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    }
}

function getActivityFileName(activityImage) {
    if (activityImage === null) return "unknown.webp"

    //get the name of the file
    const name = activityImage.split("/").pop()

    //return the name
    return name
}

export async function addReaction(user, activity, emoji) {
    try {
        const response = await axiosInstance.put(`/activities/addReaction`, {
            "userID": user._id,
            "activityID": activity._id,
            "reactionType": emoji
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        activityLog.info("Reaction has been added successfully.")
        activityLog.debug(response.data)
    } catch (error) {
        activityLog.error("Reaction could not be added.", error)
    }
}

export async function removeReaction(user, activity, emoji) {
    try {
        const response = await axiosInstance.delete(`/activities/${user._id}/${activity._id}/${emoji}`)
        activityLog.info("Reaction has been removed successfully.")
        activityLog.debug(response.data)
    } catch (error) {
        activityLog.error("Reaction could not be removed.", error)
    }
}