import React from 'react'
import { View, Text } from 'react-native'
import { classNames } from '../../utils'

/*
    HomeReactionCard is a component that represents a reaction in the home activity tab.
    It displays a single reaction.
    Typ: Component from home

    @param emoji: string -> the emoji to display
    @return:       JSX -> returns the HomeReactionCard component
*/
export default function HomeReactionCard({ emoji }) {
    return (
        <View className={classNames(
            'flex-row justify-between items-center', // position
            'px-3 mt-1', // spacing
            'w-[70px] h-[35px]', // sizing
            'bg-primary rounded-full' // styling
        )}>
            <Text className={classNames('text-xl')}>{emoji}</Text>
            <Text className={classNames('text-xl text-white ')}>0</Text>
        </View>
    )
}