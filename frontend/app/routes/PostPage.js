import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import { classNames } from '../utils'
import { games } from '../constants'
import { useUser } from '../utils/hooks/useUser'
import GameAcitvityCam from '../components/games/GameAcitvityCam'
import Activity from '../entitys/activity'

/*
    PostPage is a page that allows the user to make with a post.
    Typ: Page/route

    @return: JSX -> returns the PostPage component
*/
export default function PostPage() {
    const user = useUser()
    const cameraRef = useRef(null);
    const activity = new Activity(games[0], user, [])

    const handlePress = () => {}

    return (
        <View className={classNames(
            'justify-center items-center', // position
            'space-y-4', // spacing
            'w-full h-full', // sizing
            'bg-black opacity-90' // styling
        )}>
        <GameAcitvityCam activity={activity} cameraRef={cameraRef} handlePress={handlePress}/>
        </View>
    )
}