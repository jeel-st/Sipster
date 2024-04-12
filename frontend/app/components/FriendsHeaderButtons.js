import { View, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { classNames } from '../utils'
import React from 'react'
import { router } from 'expo-router'

export default function FriendsHeaderButtons() {
  return (
    <View className={classNames(
        'flex-row justify-between items-center',
        'px-4',
        'w-full h-16',
    )}>
        {/* Back Button*/}
        <Pressable onPress={() => router.back()}>
            <View className={classNames(
                'justify-center items-center', // position
                'pr-1', // spacing
                'w-10 h-10', // sizing
                'rounded-xl bg-secondary', // styling
            )}>
                <FontAwesome
                    name="chevron-left"
                    size={24}
                    color="white"
                />
            </View>
        </Pressable>

        {/* Search Button*/}
        <Pressable>
            <View className={classNames(
                'justify-center items-center',
                'w-10 h-10',
                'rounded-xl bg-secondary',
            )}>
                <FontAwesome
                    name="search"
                    size={24}
                    color="white"
                />
            </View>
        </Pressable>
    </View>
  )
}