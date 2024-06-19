import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { classNames } from '../../utils'
import useReactionCard from '../../utils/hooks/useReactionCard'

/*
    HomeReactionCard is a component that represents a reaction in the home activity tab.
    It displays a single reaction.
    Typ: Component from home

    @param emoji: string -> the emoji to display
    @return:       JSX -> returns the HomeReactionCard component
*/
export default function HomeReactionCard({ reaction, displayReaction, handleReaction, emoji }) {
    return (
        <TouchableOpacity
            onPress={() => handleReaction(reaction)}
            className={classNames(
                'flex-row justify-between items-center', // position
                'px-3 mt-1', // spacing
                'w-[70px] h-[35px]', // sizing
                'rounded-full', // styling
                displayReaction && displayReaction[0] === reaction[0] ? 'bg-yellow' : 'bg-primary' // styling
            )}>
            <Text className={classNames('text-xl')}>{emoji}</Text>
            <Text className={classNames(
                'text-xl', // styling
                displayReaction && displayReaction[0] === reaction[0] ? 'text-black' : 'text-white' // styling
            )}>{reaction[1].length}</Text>
        </TouchableOpacity>
    )
}