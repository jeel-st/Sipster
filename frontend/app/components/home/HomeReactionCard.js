import { View, Text } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'

export default function HomeReactionCard({ emoji }) {
    return (
        <View className={classNames(
            'flex-row justify-between items-center',
            'px-3 mt-1',
            'w-[70px] h-[35px]',
            'bg-primary rounded-full'
        )}>
            <Text className={classNames('text-xl')}>{emoji}</Text>
            <Text className={classNames('text-xl text-white ')}>0</Text>
        </View>
    )
}