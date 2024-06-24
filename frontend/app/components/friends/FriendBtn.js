import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { router } from 'expo-router'
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher';
import { classNames } from '../../utils/classNames';

/*
    FriendBtn is a component that represents a single friend in the friend list.
    It displays the profile picture and username of the friend.
    Typ: Component from friends

    @param friend:  object -> the friend to display
    @param user:    object -> the user
    @return:        JSX -> returns the FriendBtn component
*/
export default function FriendBtn({ friend, user }) {
    return (friend &&
        <Pressable className={classNames(
            'items-center', // position
            'mx-1', // spacing
            'w-20', // sizing
        )}
            onPress={() => router.navigate({ pathname: "/routes/ProfilePage", params: friend })}>
            <View className={classNames(
                'justify-center items-center', // position
                'w-20 h-20', // sizing
                'rounded-full shadow-md shadow-black bg-yellow' // styling
            )}>
                <Image className="w-5/6 h-5/6 rounded-full" source={{ uri: fetchProfilePictureCompressed(friend) }} />
            </View>
            <Text className="mt-1 text-white font-bold text-xs">{friend.username}</Text>
        </Pressable>
    )
}