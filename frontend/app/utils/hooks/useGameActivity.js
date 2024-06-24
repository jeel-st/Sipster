// Imports
import { useRouter } from 'expo-router'
import { gameLog } from '../logger/config';
import { useState } from 'react';
import { sendActivity } from '../database/activityFetcher';

/*
    Custom hook to handle the game activity

    @param activity: object -> the activity to handle
    @return: object -> the object containing the hook methods
*/
const useGameActivity = (activity) => {
    const [withSips, setWithSips] = useState(false)
    const router = useRouter()

    /*
        Method to handle if the user wants to start the game

        @return: void
    */
    async function handlePress(){
        activity.withSips = withSips
        const id = await sendActivity(activity)
        activity.ID = id
        router.navigate({ pathname: "/routes/GameFactory", params: { activity: JSON.stringify(activity) } })
    }

    /*
        Method to handle if the user wants to continue with sips or not

        @param withSips: boolean -> the choice to continue with sips or not
        @return: void
    */
    const handleChoice = (withSips) => {
        switch (withSips) {
            case true:
                gameLog.info('User choosed continue with sips')
                setWithSips(true)
                break;
            case false:
                gameLog.info('User choosed continue without sips')
                activity.withSips = withSips
                // navigate to the game factory with the current activity data
                router.navigate({ pathname: "/routes/GameFactory", params: { activity: JSON.stringify(activity) } })
                break;
            default:
                gameLog.error('User choosed invalid option')
        }
    }

    // Return state variables and functions for use in the component
    return { handlePress, handleChoice, withSips }
}

export default useGameActivity;
