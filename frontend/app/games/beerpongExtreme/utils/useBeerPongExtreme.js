import { useEffect, useState } from "react"
import { gameLog } from "../../../utils/logger/config"
import categories from "../constants/categories"

// Custom hook for managing Bomb Party game state
const useBeerPongExtreme = () => {
    // State variables for the game
    const [isPlaying, setIsPlaying] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [category, setCategory] = useState(null)
    const [challenge, setChallenge] = useState(null)

    // Function to start the game
    const handleStartGame = async () => {
        // If the game is already in progress, exit the function
        if (isPlaying) return

        // Set a random game category
        const randomIndex = Math.floor(Math.random() * categories.length);
        setCategory(categories[randomIndex]);

        // Set game status to "playing"
        setIsPlaying(true)
        gameLog.info('Beer Pong Extreme game started')
    }

    const handleIsReady = () => {
        if(!isReady){
            // Set a random challenge from the category
            const randomIndex = Math.floor(Math.random() * category.challenges.length);
            setChallenge(category.challenges[randomIndex]);

            setIsReady(true)
            gameLog.info('Beer Pong Extreme user is ready')
        }else{
            setIsPlaying(false)
            setIsReady(false)
            setCategory(null)
            setChallenge(null)
            gameLog.info('Beer Pong Extreme game ended')
        }
    }

    // Return relevant variables and functions for game state
    return { isPlaying, isReady, category, challenge, handleStartGame, handleIsReady }
}

export default useBeerPongExtreme