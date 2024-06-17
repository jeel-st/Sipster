import { useRouter } from 'expo-router'
import { gameLog } from '../logger/config';
import { useState } from 'react';
import { sendActivity } from '../database/activityFetcher';

const useGameActivity = (activity) => {
    const [withSips, setWithSips] = useState(false)
    const router = useRouter()

    // Function to handle navigation back to previous screen
    async function handlePress(){
        activity.withSips = withSips
        const id = await sendActivity(activity)
        activity.ID = id
        router.navigate({ pathname: "/routes/GameFactory", params: { activity: JSON.stringify(activity) } })
    }

    const handleChoice = (withSips) => {
        switch (withSips) {
            case true:
                gameLog.info('User choosed continue with sips')
                setWithSips(true)
                break;
            case false:
                gameLog.info('User choosed continue without sips')
                activity.withSips = withSips
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
