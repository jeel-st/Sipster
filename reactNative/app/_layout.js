import { Stack } from 'expo-router/stack'
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function AppLayout() {
    return (
        <Stack>
            <Stack.Screen name='routes/LoginPage' options={{ headerShown: false }} />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='routes/GamePage' options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        </Stack>
    )
}