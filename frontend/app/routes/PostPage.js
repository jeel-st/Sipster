import { View, Text } from 'react-native'
import React from 'react'
import { GameActivity } from '../components'
import { classNames } from '../utils'
import useUser from '../utils/database/userFetcher'
import { games } from '../constants'
import Game from '../entitys/game'

export default function PostPage() {
    const user = useUser()
    const gameList = games.map((game) => new Game(game))

    return (
        <View className={classNames(
            'flex-1 bg-primary',
        )}>
            <GameActivity user={user} game={gameList[1]}/>
        </View>
    )
}