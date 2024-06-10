import FormData from "form-data";
import Activity from "../../entitys/activity";
import { activityLog } from "../logger/config";
import axiosInstance from "./axiosConfig";
import * as FileSystem from 'expo-file-system';
import { getMimeType } from "../mimeType";

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

export async function sendActivity(user, game, file, caption) {
    try {
        const response = await axiosInstance.post('/activities/postActivity',
            {
                "beforeImagePath": "",
                "afterImagePath": "",
                "reactions": "",
                "caption": caption,
                "userID": user._id,
                "gameID": game._id
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        activityLog.info("Activity has been sent successfully.")
        activityLog.debug(response.data)

        const filename = file.uri.split("/").pop()

        let data = new FormData()
        data.append('acitivityID', response.data._id)
        data.append('file', { uri: file.uri, name: filename, type: await getMimeType(file.uri) })

        const response2 = await axiosInstance.put('/activities/postBeforePicture', data, {
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        })
        activityLog.info("ActivityBeforeImage has been sent successfully.")
        activityLog.debug(response2.data)
    } catch (error) {
        activityLog.error("Activity could not be sent.", error)
    }
}