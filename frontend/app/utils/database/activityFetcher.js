import Activity from "../../entitys/activity";

export async function createActivity(user, game){
    try {
        const activity = new Activity(1, "beforeImagePath", "afterImagePath", "emojis", "comment", game._id, user, taggedFriends)
        console.log("[createActivity] create activity successfully")
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
            console.log("[createActivity Error] ",error)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getActivity(){
    try {
        const jsonValue = await AsyncStorage.getItem('activity');
        if (jsonValue !== null) {
            const activityData = JSON.parse(jsonValue)

            console.log("[getActivity] loading activity successfully")

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
            console.log("[getActivity] Activity is Null")
        }
    } catch (error){
        console.log("[getActivity Error] ",error)
    }
}