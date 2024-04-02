import { View, Text } from 'react-native'
import React from 'react'

export default function FriendCard({friend}) {
    return (
        <View className="mx-1 w-20 items-center">
            <View className="h-20 w-20 rounded-full shadow-xl shadow-black" style={{ backgroundColor: '#343434' }}></View>
            <Text className="mt-1 text-white font-bold text-xs">{friend}</Text>
        </View>
    )
}