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
export default function HomeReactionCard({ reaction, activity, user }) {
    const { emoji, handleReaction, reactionCount, hasReacted } = useReactionCard(reaction, activity, user)

    return (
        <TouchableOpacity
            onPress={handleReaction}
            className={classNames(
                'flex-row justify-between items-center', // position
                'px-3 mt-1', // spacing
                'w-[70px] h-[35px]', // sizing
                'rounded-full', // styling
                hasReacted ? 'bg-yellow' : 'bg-primary' // styling
            )}>
            <Text className={classNames('text-xl')}>{emoji}</Text>
            <Text className={classNames(
                'text-xl', // styling
                hasReacted ? 'text-black' : 'text-white' // styling
            )}>{reactionCount}</Text>
        </TouchableOpacity>
    )
}