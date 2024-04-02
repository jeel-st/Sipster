import { View, Text, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { Colors } from '../constants/styles';

export default function FriendCard({friend}) {
    return (
        <View className="mx-1 w-20 items-center">
            <View className="h-20 w-20 rounded-full shadow-xl shadow-black justify-center items-center" style={{ backgroundColor: Colors.yellow }}>
                <Image className="w-5/6 h-5/6 rounded-full" source={{uri: friend.profile}}/>
            </View>
            <Text className="mt-1 text-white font-bold text-xs">{friend.name}</Text>
        </View>
    )
}