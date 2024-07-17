// Imports
import { useRouter } from 'expo-router'
import { sendActivityAfterImage } from '../database/activityFetcher';

/*
    Method to handle the game quit

    @param activity: object -> the activity to handle
    @return: object -> the object containing the hook methods
*/
const useGameQuit = (activity) => {
    const router = useRouter()

    /*
        Method to handle navigation back to previous screens

        @return: void
    */
    const handlePress = () => {
        sendActivityAfterImage(activity)
        router.navigate({ pathname: "(tabs)/game" })
    }

    // Return state variables and functions for use in the component
    return { handlePress }
}

export default useGameQuit;
