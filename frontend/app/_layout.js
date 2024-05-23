import { Stack } from 'expo-router/stack'
import { NativeWindStyleSheet } from "nativewind";
import 'react-native-reanimated';

NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function AppLayout() {
    return (
        <Stack>
            <Stack.Screen name='routes/LoginPage' options={{ headerShown: false }} />
            <Stack.Screen name='routes/RegisterPage' options={{ headerShown: false }} />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='routes/GamePage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/ProfilePage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/FriendsPage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/AccountPage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/SettingsPage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='routes/GameFactory' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <Stack.Screen name='index' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        </Stack>
    )
}
