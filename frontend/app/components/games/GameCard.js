import { Pressable, Image } from 'react-native'
import { router } from 'expo-router'
import React from 'react'
import { classNames } from '../../utils'

/*
    GameCard is a component that represents a single game in the game list.
    It displays the thumbnail of the game.
    Typ: Component from games

    @param game: object -> the game to display
    @return:     JSX -> returns the GameCard component
*/
export default function GameCard({ game }) {
    return (
        <Pressable
            className={classNames(
                'mr-4', // spacing
                'w-40 h-40', // sizing
                'rounded-3xl shadow-md shadow-black bg-secondary' // styling
            )}
            onPress={() => router.navigate({ pathname: "/routes/GamePage", params: game })}
        >
            <Image className="w-full h-full rounded-3xl" source={{ uri: game.thumbnail }} />
        </Pressable>
    )
}