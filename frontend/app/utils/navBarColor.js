// Imports
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { Platform } from "react-native";

/*
    Function to set the navigation bar color

    @param color: string -> the color to set
*/
export function navBarColor(color) {
    if (Platform.OS === 'android') {
        setBackgroundColorAsync(color);
    }
}