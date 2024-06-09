
import { useRouter } from 'expo-router'
import { gameLog } from '../logger/config';

export const useGameQuit = (game) => {
    const router = useRouter()

    // Function to handle navigation back to previous screen
    const handlePress = () => {
        router.navigate({ pathname: "(tabs)/games" })
    }

    // Return state variables and functions for use in the component
    return { handlePress }
}

export default quitGame = (activity, router) => {
    if(activity.withSips) {
        router.navigate({ pathname: "/routes/GameQuitPage", params: { activity: JSON.stringify(activity) } })
    } else {
        router.navigate('(tabs)/games')
    }
}