import { View, Text, Image } from 'react-native'
import { styles } from '../constants';
import React from 'react'

export default function FriendCard({ friend }) {
    return (
        <View className="pl-8 mx-1 w-20 items-center">
            <View className="h-20 w-20 rounded-full shadow-lg shadow-white justify-center items-center" style={{ backgroundColor: styles.Colors.yellow }}>
                <Image className="w-5/6 h-5/6 rounded-full" source={{ uri: friend.profile }} />
            </View>
            <Text className="mt-1 text-white font-bold text-xs">{friend.name}</Text>
        </View>
    )
}