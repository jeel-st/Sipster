import { ScrollView, View } from 'react-native'
import { games } from '../../constants'
import GameCard from './GameCard'
import React, { useEffect, useState } from 'react'
import Game from '../../entitys/game';

/*
    Games is a component that represents the list of games.
    It displays a list of games in a horizontal scroll view.
    Typ: Component from games

    @return: JSX -> returns the Games component
*/
export default function Games() {
    const [scrollEnable, setScrollEnable] = useState(false);

    const gameList = games.map((game) => new Game(game))

    useEffect(() => {
        if (gameList.length > 2) setScrollEnable(true)
        else setScrollEnable(false)
    }, gameList)

    return (
        <View>
            <ScrollView
                className="mt-4 px-2"
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={scrollEnable}>
                {
                    gameList.map((game, index) =>
                        <GameCard
                            game={game}
                            key={index}
                        />
                    )
                }
            </ScrollView>
        </View>
    )
}