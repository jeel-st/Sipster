import Activity from "../../entitys/activity";
import { activityLog } from "../logger/config";

export async function createActivity(user, game){
    try {
        const activity = new Activity(1, "beforeImagePath", "afterImagePath", "emojis", "comment", game._id, user, taggedFriends)
        activityLog.debug("Activity has been created successfully.")
        try{
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
        } catch (error){
            activityLog.error("Activity could not be stored.", error)
        }
    } catch (error) {
        activityLog.error("Activity could not be created.", error)
    }
}

export async function getActivity(){
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

            return(activity)
        }else{
            activityLog.error("Activity could not be loaded.")
        }
    } catch (error){
        activityLog.error("Activity could not be loaded.", error)
    }
}