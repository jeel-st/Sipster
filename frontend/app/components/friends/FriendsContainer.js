import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from '../../constants'
import { router } from 'expo-router'
import React from 'react'
import getProfilePicture from '../../utils/accountFetcher'

export default function FriendsContainer({ friend }) {
  return (
    <TouchableOpacity
      className="flex-1 flex-row items-center rounded-full shadow-md shadow-black h-20 space-x-4 mb-5"
      style={{ backgroundColor: styles.Colors.secondary }}
      onPress={() => router.navigate({ pathname: "/routes/ProfilePage", params: friend })}
    >
      <View className="w-20 h-20 rounded-full shadow-md shadow-black">
        <Image className="w-full h-full rounded-full" source={{ uri: `http://85.215.71.124/static/${getProfilePicture(friend)}` }} />
      </View>
      <View className="flex-1 self-center">
        <Text className="text-white font-bold">{friend.firstName + " " + friend.lastName}</Text>
        <Text className="text-neutral-400 font-thin">{friend.username}</Text>
      </View>
    </TouchableOpacity>
  )
}