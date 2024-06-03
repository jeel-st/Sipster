import { useIsFocused } from '@react-navigation/native';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export function useNavBarColor(color) {
    const isFocused = useIsFocused();
    useEffect(() => {
        if (Platform.OS === 'android') {
            setBackgroundColorAsync(color);
        }
    }, [isFocused]);
}