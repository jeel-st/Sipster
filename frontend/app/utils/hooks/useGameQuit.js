
import { useRouter } from 'expo-router'
import { sendActivityAfterImage } from '../database/activityFetcher';

const useGameQuit = (activity) => {
    const router = useRouter()

    // Function to handle navigation back to previous screen
    const handlePress = () => {
        sendActivityAfterImage(activity)
        router.navigate({ pathname: "(tabs)/game" })
    }

    // Return state variables and functions for use in the component
    return { handlePress }
}

export default useGameQuit;
