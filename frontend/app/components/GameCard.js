import { Pressable, Image } from 'react-native'
import { styles } from '../constants'
import { router } from 'expo-router'
import React from 'react'

export default function GameCard({ game }) {
    return (
        <Pressable
            className="mx-4 mb-5 w-40 h-40 rounded-3xl shadow-xl shadow-white"
            style={{ backgroundColor: styles.Colors.secondary }}
            onPress={() => router.navigate({ pathname: "/routes/GamePage", params: { name: game.name, profile: game.profile, desc: game.desc, playtime: game.playtime } })}>
            <Image className="w-full h-full rounded-3xl" source={{ uri: game.profile }} />
        </Pressable>
    )
}