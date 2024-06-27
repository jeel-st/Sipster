import { useEffect, useState } from "react"
import { Vibration } from "react-native"
import { Audio } from 'expo-av'
import categories from "../constants/categories"
import { gameLog } from "../../../utils/logger/config"

// Map of sound filenames to their corresponding require paths
const soundMap = {
    'Ticking.mp3': require('../assets/sounds/Ticking.mp3'),
    'Explosion.mp3': require('../assets/sounds/Explosion.mp3')
}

const minTime = 30000; // 30 seconds
const maxTime = 60000; // 1 minute

// Custom hook for managing Bomb Party game state
const useBombParty = () => {
    // State variables for the game
    const [isPlaying, setIsPlaying] = useState(false)
    const [category, setCategory] = useState(null)
    const [timer, setTimer] = useState(0)
    const [explodingTime, setExplodingTime] = useState(0)
    const [sound, setSound] = useState(null)
    const [countdown, setCountdown] = useState(0)

    // Function to start the game
    const handleStartGame = async () => {
        // If the game is already in progress, exit the function
        if (isPlaying) return

        setCountdown(3)

        // Start countdown
        const countdownInterval = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(countdownInterval)
                    return 0
                }
                return prevCountdown - 1
            })
        }, 1000)

        // Wait for countdown to finish
        await new Promise(resolve => setTimeout(resolve, 3000))

        // Set a random game category
        const randomIndex = Math.floor(Math.random() * categories.length);
        setCategory(categories[randomIndex]);

        // Set random exploding time between 30 seconds and 1 minute
        const randomExplodingTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
        setExplodingTime(randomExplodingTime);

        // Set game status to "playing"
        setIsPlaying(true)
        setTimer(0)

        // Load and play ticking sound
        const tickingSound = await playSound('Ticking.mp3')
        setSound(tickingSound)

    }

    // Effect for game progression
    useEffect(() => {
        // If the game is not in progress, exit the effect
        if (!isPlaying) return

        // Start game timer
        const startTime = Date.now()
        gameLog.info('Bomb Party game started')

        // Update timer
        const updateElapsedTime = () => {
            setTimer(Date.now() - startTime)
        }

        const interval = setInterval(updateElapsedTime, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [isPlaying])

    // Effect for reaching explosion time
    useEffect(() => {
        // If explosion time is reached and a sound is present
        if (explodingTime < timer && sound) {
            gameLog.info('Explosion time reached')
            // Stop ticking sound
            sound.stopAsync()
            // Play explosion sound
            playSound('Explosion.mp3')
            // Activate vibration
            Vibration.vibrate(3 * 1000)
            // Set game status to "not playing"
            setIsPlaying(false)
            gameLog.info('Bomb Party game ended')
        }
    }, [timer, sound])

    // Function to play a sound
    const playSound = async (filename) => {
        gameLog.info(`Loading ${filename}`)
        // Load sound
        const { sound } = await Audio.Sound.createAsync(soundMap[filename])
        gameLog.info(`Playing ${filename}`)
        // Play sound
        await sound.playAsync()
        return sound
    }

    // Effect for unloading sound
    useEffect(() => {
        return () => {
            if (sound) {
                // Unload sound
                sound.unloadAsync()
            }
        }
    }, [sound])

    // Return relevant variables and functions for game state
    return { isPlaying, category, countdown, handleStartGame }
}

export default useBombParty