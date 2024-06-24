import React from 'react'
import { View, Text, Image } from 'react-native'
import TagCard from '../layout/TagCard'
import { classNames } from '../../utils/classNames'

export default function GameInfoCard({ game }) {
    return (
        <View className={classNames(
            'flex-row items-center', // position
            'mx-6 mt-5', // spacing
            'h-44', // sizing
            'rounded-3xl shadow-md shadow-black bg-yellow' // styling
        )}>
            <View className={classNames(
                'flex-1', // position
                'mx-5 ' // spacing
            )}>
                <Text className="text-black tracking-wide font-light">Play Now</Text>
                <Text className="text-black font-semibold text-lg">{game.name}</Text>
                <Text className="text-black font-light tracking-wide max-h-[46%]">{game.description}</Text>
            </View>
            <View className={classNames(
                'mr-4', // spacing
                'w-40 h-40', // sizing
                'rounded-3xl shadow-md shadow-black bg-secondary' // styling
            )}>
                {game.thumbnail !== "" &&
                    <Image className="w-full h-full rounded-3xl" source={{ uri: game.thumbnail }} />
                }
            </View>
        </View>
    )
}