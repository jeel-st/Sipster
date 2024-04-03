import { Stack } from 'expo-router/stack'

export default function AppLayout(){
    return (
        <Stack>
            <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
            <Stack.Screen name='routes/GamePage' options={{headerShown: false, animation: 'slide_from_bottom'}}/>
        </Stack>
    )
}