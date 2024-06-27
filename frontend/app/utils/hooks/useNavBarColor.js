// Imports
import { useIsFocused } from '@react-navigation/native';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

/*
    Custom hook to set the navigation bar color

    @param color: string -> the color to set
*/
export function useNavBarColor(color) {
    // Check if the screen is focused
    const isFocused = useIsFocused();
    useEffect(() => {
        if (Platform.OS === 'android') {
            // Set the navigation bar color based on the screen focus
            setBackgroundColorAsync(color);
        }
    }, [isFocused]);
}