import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from '../../constants'
import { router } from 'expo-router'
import React from 'react'
import getProfilePicture from '../../utils/accountFetcher'

export default function FriendsInvitationContainer({ friend }) {
  return ( friend &&
    <TouchableOpacity
      className="flex-1 flex-row items-center rounded-full shadow-md shadow-black h-20 mb-5"
      style={{ backgroundColor: styles.Colors.secondary }}
      onPress={() => router.navigate({ pathname: "/routes/ProfilePage", params: friend })}
    >
      <View className="w-20 h-20 rounded-full shadow-md shadow-black">
        <Image className="w-full h-full rounded-full" source={{ uri: `http://85.215.71.124/static/${getProfilePicture(friend)}` }} />
      </View>
      <View className="flex-1 self-center ml-4">
        <Text className="text-white font-bold">{friend.firstName + " " + friend.lastName}</Text>
        <Text className="text-neutral-400 font-thin">{friend.username}</Text>
      </View>
      <TouchableOpacity className="w-1/3 h-10 rounded-full bg-primary justify-center">
        <Text className="text-center text-white font-bold">Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-10 h-10 rounded-full justify-center mr-2">
        <Text className="text-center text-white font-bold">X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}