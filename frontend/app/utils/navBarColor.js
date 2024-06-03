import { setBackgroundColorAsync } from "expo-navigation-bar";
import { Platform } from "react-native";

export function navBarColor(color) {
    if (Platform.OS === 'android') {
        setBackgroundColorAsync(color);
    }
}