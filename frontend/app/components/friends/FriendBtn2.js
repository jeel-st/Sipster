import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher'
import { classNames } from '../../utils/classNames'
import { useFriendBtn2 } from '../../utils/hooks/friends/useFriendBtn2'

/*
    FriendBtn2 is a component that represents a single friend in the friend list.
    It displays the profile picture, name, and username of the friend.
    It also displays buttons to accept or decline friend requests.
    Typ: Component from friends

    @param friend:          object -> the friend to display
    @param selectedTab:     number -> the selected tab in the friends page
    @param handleReloadFriends: function -> the function to call when the friends list should be reloaded
    @return:                JSX -> returns the FriendBtn2 component
*/
export default function FriendBtn2({ friend, selectedTab, handleReloadFriends }) {
  const { handleAcceptInvite, handleDeclineInvite, handleCancelInvite } = useFriendBtn2({ friend, handleReloadFriends })

  return (friend &&
    <TouchableOpacity
      className={classNames(
        'flex-1 flex-row items-center', // position
        'space-x-4 mb-5', // spacing
        'h-20', // sizing
        'rounded-full shadow-md shadow-black bg-secondary' // styling
      )}
      onPress={() => router.navigate({ pathname: "/routes/ProfilePage", params: friend })}
    >
      <View className={classNames(
        'w-20 h-20', // sizing
        'rounded-full bg-primary' // styling
      )}>
        <Image className="w-full h-full rounded-full" source={{ uri: fetchProfilePictureCompressed(friend) }} />
      </View>
      <View className="flex-1 self-center">
        <Text className="text-white font-bold">{friend.firstName + " " + friend.lastName}</Text>
        <Text className="text-neutral-400 font-thin">{friend.username}</Text>
      </View>
      {
        selectedTab === 1 &&
        <>
          <TouchableOpacity
            onPress={handleAcceptInvite}
            className={classNames(
              'flex-1 justify-center', // position
              'ml-1', // spacing
              'h-10', // sizing
              'rounded-full bg-primary' // styling
            )}>
            <Text className="text-center text-white font-bold">Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeclineInvite}
            className={classNames(
              'justify-center', // position
              'mr-2', // spacing
              'w-10 h-10' // sizing
            )}>
            <Text className="text-center text-white font-bold">X</Text>
          </TouchableOpacity>
        </>
      }
      {
        selectedTab === 2 &&
        <>
          <TouchableOpacity
            onPress={handleCancelInvite}
            className={classNames(
              'justify-center', // position
              'mr-2', // spacing
              'w-10 h-10', // sizing
              'rounded-full' // styling
            )}>
            <Text className="text-center text-white font-bold">X</Text>
          </TouchableOpacity>
        </>
      }
    </TouchableOpacity>
  )
}