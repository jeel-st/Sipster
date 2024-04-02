import { View, Text, ScrollView, Touchable, Pressable } from 'react-native'
import { Colors } from '../constants/styles'
import { games } from '../constants/games'
import React from 'react'
import GameCard from './GameCard'

export default function Games() {
    return (
        <ScrollView className="mt-4" horizontal showsHorizontalScrollIndicator={false}>
            {
                games.map((game, index) => <GameCard game={game} key={index}/>)
            }
        </ScrollView>
    )
}