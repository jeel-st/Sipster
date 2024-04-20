import { ScrollView, View } from 'react-native'
import { games } from '../constants'
import GameCard from './GameCard'
import React, { useEffect, useState } from 'react'

export default function Games() {
    const [scrollEnable, setScrollEnable] = useState(false);

    useEffect(() => {
        if (games.length > 2) setScrollEnable(true)
        else setScrollEnable(false)
    }, games)

    return (
        <View>
            <ScrollView
                className="mt-4 px-2"
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={scrollEnable}>
                {
                    games.map((game, index) => <GameCard game={game} key={index} />)
                }
            </ScrollView>
        </View>
    )
}