import { View, Text, Image, Pressable } from 'react-native'
import { styles } from '../constants';
import { router } from 'expo-router'
import React from 'react'

export default function FriendCard({ friend }) {
    return (
        <Pressable className="pl-8 mx-1 w-20 items-center"
            onPress={() => router.navigate({ pathname: "/routes/ProfilePage", params: { fullname: friend.fullname, sipsterid: friend.sipsterid, date: friend.date, profile: friend.profile, sips: friend.sips } })}>
            <View className="h-20 w-20 rounded-full shadow-xl shadow-black justify-center items-center" style={{ backgroundColor: styles.Colors.yellow }}>
                <Image className="w-5/6 h-5/6 rounded-full" source={{ uri: friend.profile }} />
            </View>
            <Text className="mt-1 text-white font-bold text-xs">{friend.name}</Text>
        </Pressable>
    )
}