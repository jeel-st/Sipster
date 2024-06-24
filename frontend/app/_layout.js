// Imports
import { Stack } from 'expo-router/stack'
import { NativeWindStyleSheet } from "nativewind";
import 'react-native-reanimated';

// Setting the output for NativeWind styles to "native"
NativeWindStyleSheet.setOutput({
    default: "native",
});

/*
 AppLayout Component
 This component sets up the main navigation stack for the app, defining different routes/screens.
  
 @return:       JSX.Element -> The layout for the app's navigation stack
 */
export default function AppLayout() {
    return (
        <Stack>
            <Stack.Screen name='routes/LoginPage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/RegisterPage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='(tabs)' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/GamePage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/ProfilePage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/FriendsPage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/AccountPage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/SettingsPage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/GameFactory' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/GameQuitPage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='index' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        </Stack>
    )
}
