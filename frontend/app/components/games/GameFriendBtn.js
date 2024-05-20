import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'
import { fetchProfilePictureCompressed } from '../../utils/database/imageFetcher'
import { AntDesign } from '@expo/vector-icons'

export default function GameFriendBtn({ friend }) {
    return (
        <View className={classNames(
            'flex-row justify-between items-center',
            'pl-2 pr-4 mb-2',
            'w-full h-14',
            'bg-secondary rounded-full'
        )}>
            <View className={classNames(
                'flex-row items-center',
                'space-x-4'
            )}>
                <View className="w-12 h-12 rounded-full bg-primary">
                    <Image className="w-full h-full rounded-full" source={{ uri: fetchProfilePictureCompressed(friend) }} />
                </View>

                <View className="flex-1 self-center">
                    <Text className="text-white font-bold">{friend.firstName + " " + friend.lastName}</Text>
                    <Text className="text-neutral-400 font-thin">{friend.username}</Text>
                </View>

                <TouchableOpacity>
                    <AntDesign name="pluscircleo" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}