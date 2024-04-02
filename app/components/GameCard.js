import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { Colors } from '../constants/styles'
import { router } from 'expo-router'

export default function GameCard({game}) {
    return (
        <Pressable
            className="mx-4 mb-4 w-40 h-40 rounded-3xl shadow-xl shadow-black"
            style={{backgroundColor: Colors.secondary}}
            onPress={() => router.navigate({ pathname: "/routes/GamePage", params: { name: game.name, profile: game.profile, desc: game.desc, playtime: game.playtime }})}>
            <Image className="w-full h-full rounded-3xl" source={{uri: game.profile}}/>
        </Pressable>
    )
}