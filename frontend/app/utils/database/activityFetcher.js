import FormData from "form-data";
import Activity from "../../entitys/activity";
import { activityLog } from "../logger/config";
import axiosInstance, { HOST } from "./axiosConfig";
import { getMimeType } from "../mimeType";
import { func } from "prop-types";

export async function createActivity(user, game) {
    try {
        const activity = new Activity(1, "beforeImagePath", "afterImagePath", "emojis", "comment", game._id, user, taggedFriends)
        activityLog.debug("Activity has been created successfully.")
        try {
            const activityObject = {
                ID: activity.ID,
                beforeImagePath: activity.beforeImagePath,
                afterImagePath: activity.afterImagePath,
                emojis: activity.emojis,
                comment: activity.comment,
                gameID: activity.gameID,
                creator: activity.creator,
                taggedFriends: activity.taggedFriends
            }

            const jsonValue = JSON.stringify(activityObject);
            await AsyncStorage.setItem('activity', jsonValue)
        } catch (error) {
            activityLog.error("Activity could not be stored.", error)
        }
    } catch (error) {
        activityLog.error("Activity could not be created.", error)
    }
}

export async function getActivity() {
    try {
        const jsonValue = await AsyncStorage.getItem('activity');
        if (jsonValue !== null) {
            const activityData = JSON.parse(jsonValue)

            activityLog.debug("Activity has been loaded successfully.")

            const activity = new Activity(
                activityData.ID,
                activityData.beforeImagePath,
                activityData.afterImagePath,
                activityData.emojis,
                activityData.comment,
                activityData.gameID,
                activityData.creatorID
            );

            return (activity)
        } else {
            activityLog.error("Activity could not be loaded.")
        }
    } catch (error) {
        activityLog.error("Activity could not be loaded.", error)
    }
}

export async function sendActivity(activity) {
    try {
        const response = await axiosInstance.post('/activities/postActivity',
            {
                "caption": activity.caption,
                "userID": activity.user.userID,
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
        activityLog.debug(response2.data)

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
        activityLog.debug(response.data)
    }
    catch (error) {
        activityLog.error("ActivityAfterImage could not be sent.", error)
    }
}

export async function fetchActivity(user) {
    try {
        const response = await axiosInstance.get(`/activities/${user.userID}`)
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
            const endPoint = `${HOST}/static/beforePicture/${getActivityFileName(activity.beforeImagePath)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    } else {
        try {
            const endPoint = `${HOST}/static/afterPicture/${getActivityFileName(activity.afterImagePath)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    }
}

function getActivityFileName(activityImage) {
    if (activityImage == null) return "unknown.jpg"
    const name = activityImage.split("/")
    return name[name.length - 1]
}

export async function addReaction(user, activity, emoji) {
    try {
        const response = await axiosInstance.put(`/activities/addReaction`, {
            "userID": user.userID,
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