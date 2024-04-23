import { View, Text } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'
import { styles } from '../../constants';



export default function GameInfo({ game }) {
    const title = game.name;
    const time = game.time;
    const desc = game.desc;
    return (
        <View className={classNames('mx-4','w-40 h-40','rounded-3xlbg-primary')}>
            <Text className="mt-5 text-white font-bold text-xl tracking-widest" > {title} </Text>
            <Text className="color-white" > {desc} </Text>
        </View>
    )
}