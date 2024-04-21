import { Pressable, Text, View } from 'react-native'
import { styles } from '../../constants'
import { router } from 'expo-router'
import React from 'react'
import { GameCard } from '../games/GameCard'

export default function GameOverview() {
    return (
        <Pressable
            className="mx-4 mb-5 rounded-3xl shadow-md shadow-black flex1-row alignItem-center"
            style={{ backgroundColor: styles.Colors.secondary }}
            onPress={() => router.navigate({ pathname: "/routes/Gamepage"})}
            >
            <GameCard />
            <View>
                <Text>Test</Text>
            </View>
        </Pressable>
    )
}