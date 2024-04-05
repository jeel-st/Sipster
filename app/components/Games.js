import { ScrollView } from 'react-native'
import { games } from '../constants'
import GameCard from './GameCard'
import React from 'react'

export default function Games() {
    return (
        <ScrollView className="mt-4 mx-2" horizontal showsHorizontalScrollIndicator={false}>
            {
                games.map((game, index) => <GameCard game={game} key={index} />)
            }
        </ScrollView>
    )
}