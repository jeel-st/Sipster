import { View, Text, Image, Pressable } from 'react-native'
import { styles } from '../../constants'
import { router } from 'expo-router'
import React from 'react'

export default function FriendsContainer({ friend }) {
  return (
    <Pressable
      className="flex-1 flex-row items-center rounded-full shadow-md shadow-black h-20 space-x-4 mb-5"
      style={{ backgroundColor: styles.Colors.secondary }}
      onPress={() => router.navigate({ pathname: "/routes/ProfilePage", params: { fullname: friend.fullname, sipsterid: friend.sipsterid, date: friend.date, profile: friend.profile, sips: friend.sips } })}
    >
      <View className="w-20 h-20 rounded-full shadow-md shadow-black">
        <Image className="w-full h-full rounded-full" source={{ uri: friend.profile }} />
      </View>
      <View className="flex-1 self-center">
        <Text className="text-white font-bold">{friend.fullname}</Text>
        <Text className="text-neutral-400 font-thin">{friend.sipsterid}</Text>
      </View>
    </Pressable>
  )
}