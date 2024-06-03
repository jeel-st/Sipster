import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher'
import { AntDesign } from '@expo/vector-icons'

/*
    GameFriendBtn is a component that represents a single friend in the game activity.
    It displays the profile picture, name, and username of the friend.
    It also displays a button to tag the friend.
    Typ: Component from games

    @param friend:             object -> the friend to display
    @param handleTaggedFriends: function -> the function to call when the friend is tagged
    @param isTagged:           boolean -> if the friend is tagged
    @return:                   JSX -> returns the GameFriendBtn component
*/
export default function GameFriendBtn({ friend, handleTaggedFriends, isTagged}) {
    return (
        <View className={classNames(
            'flex-row justify-between items-center', // position
            'pl-2 pr-4 mb-2', // spacing
            'w-full h-14', // sizing
            'bg-secondary rounded-full' // styling
        )}>
            <View className={classNames(
                'flex-row items-center', // position
                'space-x-4' // spacing
            )}>
                <View className={classNames(
                    'w-12 h-12', // sizing
                    'rounded-full bg-primary' // styling
                )}>
                    <Image className="w-full h-full rounded-full" source={{ uri: fetchProfilePictureCompressed(friend) }} />
                </View>

                <View className="flex-1 self-center">
                    <Text className="text-white font-bold">{friend.firstName + " " + friend.lastName}</Text>
                    <Text className="text-neutral-400 font-thin">{friend.username}</Text>
                </View>

                { !isTagged ?
                <TouchableOpacity onPress={handleTaggedFriends}>
                    <AntDesign name="pluscircleo" size={30} color="#86efac" />
                </TouchableOpacity> :
                <TouchableOpacity onPress={handleTaggedFriends}>
                    <AntDesign name="minuscircle" size={30} color="#ef4444" />
                </TouchableOpacity>
                }
            </View>
        </View>
    )
}