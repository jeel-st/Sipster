// Imports
import FormData from "form-data";
import { activityLog } from "../logger/config";
import axiosInstance, { HOST } from "./axiosConfig";
import { getMimeType } from "../mimeType";

/*
    Method to send an activity

    @param activity: object -> the activity to send
    @return: string -> the activity ID
*/
export async function sendActivity(activity) {
    try {
        // Send activity data to the server
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

        // Save the activity ID from the response
        activity.ID = response.data._id

        // Extract the image name from the URI
        const imageName = activity.image.uri.split("/").pop()

        // Create FormData for the image upload
        let data = new FormData()
        data.append('acitivityID', activity.ID)
        data.append('file', { uri: activity.image.uri, name: imageName, type: await getMimeType(activity.image.uri) })

        // Upload the image
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

/*
    Method to send an activity after an image has been added

    @param activity: object -> the activity to send
    @return: void
*/
export async function sendActivityAfterImage(activity) {
    try {
        // Extract the filename from the URI
        const filename = activity.image.uri.split("/").pop()

        // Create FormData for the image upload
        let data = new FormData()
        data.append('acitivityID', activity.ID)
        data.append('file', { uri: activity.image.uri, name: filename, type: await getMimeType(activity.image.uri) })

        // Upload the image
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

/*
    Method to delete an activity

    @param user: object -> the user fetching activities
    @param idSet: array -> set of IDs to filter activities
    @return: object -> fetched activities
*/
export async function fetchActivity(user, idSet) {
    try {
        // Fetch activities with the specified user ID and used IDs
        const response = await axiosInstance.put(`/homepage`,
            {
                "userID": user._id,
                "usedIDs": idSet,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        activityLog.debug("Activity has been fetched successfully.")

        return response.data
    } catch (error) {
        activityLog.error("Activity could not be fetched.", error)
    }
}

/*
    Method to fetch the activities from a user

    @param user: object -> the user to fetch the activities from
    @return: object -> the activities from the user
*/
export async function fetchActivityFromUser(user) {
    try {
        // Fetch activities from the user by user ID
        const response = await axiosInstance.get(`/activities/getActivitiesFromUser/${user._id}`)
        activityLog.debug("Activity has been fetched successfully.")

        return response.data
    } catch (error) {
        activityLog.error("Activity could not be fetched.", error)
    }
}

/*
    Method to fetch picture of an activity

    @param activity: object -> the activity to fetch the picture from
    @param refreshDate: string -> the date to refresh the picture
    @param isBeforeImage: boolean -> if the picture is the before image
    @return: string -> the picture of the activity
*/
export function fetchActivityPicture(activity, refreshDate, isBeforeImage) {
    if (!refreshDate) refreshDate = friend.lastLogin

    if (isBeforeImage) {
        try {
            // Generate endpoint for before image
            const endPoint = `${HOST}/static/beforePicture/compressed1080/${getActivityFileName(activity.beforeImage)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    } else {
        try {
            // Generate endpoint for after image
            const endPoint = `${HOST}/static/afterPicture/compressed1080/${getActivityFileName(activity.afterImage)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    }
}

/*
    Method to fetch compressed picture of an activity

    @param activity: object -> the activity to fetch the picture from
    @param refreshDate: string -> the date to refresh the picture
    @param isBeforeImage: boolean -> if the picture is the before image
    @return: string -> the picture of the activity
*/
export function fetchActivityPictureCompressed(activity, refreshDate, isBeforeImage) {
    if (!refreshDate) refreshDate = friend.lastLogin

    if (isBeforeImage) {
        try {
            // Generate endpoint for compressed before image
            const endPoint = `${HOST}/static/beforePicture/compressed80/${getActivityFileName(activity.beforeImage)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    } else {
        try {
            // Generate endpoint for compressed after image
            const endPoint = `${HOST}/static/afterPicture/compressed80/${getActivityFileName(activity.afterImage)}?${refreshDate}`
            return endPoint
        } catch (error) {
            throw error;
        }
    }
}

/*
    Method to fetch the name of the file

    @param activityImage: string -> the activity image
    @return: string -> the name of the file
*/
function getActivityFileName(activityImage) {
    if (activityImage === null) return "unknown.webp"

    //get the name of the file
    const name = activityImage.split("/").pop()

    //return the name
    return name
}

/*
    Method to fetch the activities from a game

    @param game: object -> the game to fetch the activities from
    @return: object -> the activities from the game
*/
export async function addReaction(user, activity, emoji) {
    try {
        // Add reaction to the activity
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

/*
    Method to remove a reaction

    @param user: object -> the user to remove the reaction from
    @param activity: object -> the activity to remove the reaction from
    @param emoji: string -> the emoji to remove
    @return: void
*/
export async function removeReaction(user, activity, emoji) {
    try {
        // Remove reaction from the activity
        const response = await axiosInstance.delete(`/activities/${user._id}/${activity._id}/${emoji}`)
        activityLog.info("Reaction has been removed successfully.")
        activityLog.debug(response.data)
    } catch (error) {
        activityLog.error("Reaction could not be removed.", error)
    }
}