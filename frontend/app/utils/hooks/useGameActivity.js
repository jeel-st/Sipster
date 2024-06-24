import { useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { Camera } from "expo-camera";
import { CameraType, FlashMode } from 'expo-camera/build/legacy/Camera.types';
import { useRouter } from 'expo-router'

const useGameActivity = (cameraRef, game, taggedFriends) => {
    // State variables for camera permission, captured image, camera type, flash mode, and caption
    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(CameraType.front)
    const [flash, setFlash] = useState(FlashMode.off)
    const [caption, setCaption] = useState('About last Night #fun #party');
    const router = useRouter()

    // useEffect Hook to check camera and media library permissions
    useEffect(() => {
        (async () => {
            // Request permissions for media library
            MediaLibrary.requestPermissionsAsync()
            // Request camera permissions and update state
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            setHasCameraPermission(cameraStatus.status === 'granted')
        })
    }, [])

    // Function to capture a picture with the camera
    const takePicture = async () => {
        if (cameraRef.current) {
            // Capture picture and update URI
            const photo = await cameraRef.current.takePictureAsync()
            setImage(photo.uri)
            // Turn off flash
            setFlash(FlashMode.off)
            console.log('[useGameActivity] Picture taken')
        }
    }

    // Function to handle navigation back to previous screen
    const handlePress = () => {
        router.navigate({ pathname: "/routes/GameFactory", params: game })
    }

    // Return state variables and functions for use in the component
    return { image, setImage, type, setType, flash, setFlash, takePicture, caption, setCaption, handlePress }
}

export default useGameActivity;
