import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from '../../constants'
import { router } from 'expo-router'
import React from 'react'
import getProfilePicture from '../../utils/accountFetcher'
import { acceptFriendInvite, declineFriendInvite } from '../../utils/friendsFetcher'

export default function FriendsContainer({ friend, selectedTab, user }) {
  return (friend &&
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
      {
        selectedTab === 1 &&
        <>
          <TouchableOpacity
            onPress={async () => { await acceptFriendInvite(friend.username, user.username) }}
            className="flex-1 h-10 rounded-full bg-primary justify-center ml-1">
            <Text className="text-center text-white font-bold">Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => { await declineFriendInvite(friend.username, user.username)}}
            className="w-10 h-10 rounded-full justify-center mr-2">
            <Text className="text-center text-white font-bold">X</Text>
          </TouchableOpacity>
        </>
      }
      {
        selectedTab === 2 &&
        <>
          <TouchableOpacity
            onPress={async () => { await declineFriendInvite(user.username, friend.username)}}
            className="w-10 h-10 rounded-full justify-center mr-2">
            <Text className="text-center text-white font-bold">X</Text>
          </TouchableOpacity>
        </>
      }
    </TouchableOpacity>
  )
}