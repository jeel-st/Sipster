import { Pressable, Image } from 'react-native'
import { router } from 'expo-router'
import React from 'react'
import { classNames } from '../../utils'

export default function GameCard({ game }) {
    return (
        <Pressable
            className={classNames(
                'mx-4',
                'w-40 h-40',
                'rounded-3xl shadow-md shadow-black bg-secondary'
            )}
            onPress={() => router.navigate({ pathname: "/routes/GamePage", params: game })}
        >
            <Image className="w-full h-full rounded-3xl" source={{ uri: game.thumbnail }} />
        </Pressable>
    )
}