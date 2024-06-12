import { View, Text } from 'react-native'
import React from 'react'
import { GameActivity } from '../components'
import { classNames } from '../utils'
import { games } from '../constants'
import Game from '../entitys/game'
import { useUser } from '../utils/hooks/useUser'

/*
    PostPage is a page that allows the user to make with a post.
    Typ: Page/route

    @return: JSX -> returns the PostPage component
*/
export default function PostPage() {
    const user = useUser()
    const gameList = games.map((game) => new Game(game))

    return (
        <View className={classNames(
            'flex-1', // position
            'bg-primary', // styling
        )}>
            <GameActivity user={user} game={gameList[1]}/>
        </View>
    )
}