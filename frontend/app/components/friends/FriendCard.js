import { View, Text, Image, Pressable } from 'react-native'
import { styles } from '../../constants';
import { router } from 'expo-router'
import React from 'react'

export default function FriendCard({ friend }) {
    return (
        <Pressable className="pl-8 mx-1 w-20 items-center"
            onPress={() => router.navigate({ pathname: "/routes/ProfilePage", params: friend})}>
            <View className="h-20 w-20 rounded-full shadow-md shadow-black justify-center items-center" style={{ backgroundColor: styles.Colors.yellow }}>
                <Image className="w-5/6 h-5/6 rounded-full" source={{ uri: styles.uri }} />
            </View>
            <Text className="mt-1 text-white font-bold text-xs">{friend.username}</Text>
        </Pressable>
    )
}