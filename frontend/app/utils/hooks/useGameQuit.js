
import { useRouter } from 'expo-router'
import { gameLog } from '../logger/config';

const useGameQuit = (game) => {
    const router = useRouter()

    // Function to handle navigation back to previous screen
    const handlePress = () => {
        router.navigate({ pathname: "(tabs)/games" })
    }

    // Return state variables and functions for use in the component
    return { handlePress }
}

export default useGameQuit;
