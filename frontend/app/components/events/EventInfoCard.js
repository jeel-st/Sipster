import { View, Text } from 'react-native'
import { styles } from '../../constants'
import React from 'react'
import TagCard from '../layout/TagCard'

export default function EventInfoCard({ event }) {
    return (
        <View className="h-72 m-1 mx-6 rounded-3xl shadow-md shadow-black mt-5" style={{ backgroundColor: styles.Colors.yellow }}>
            <View className="flex-1 justify-start mx-5 my-5 space-y-3">
                <Text className="text-black tracking-wide">{event.header}</Text>
                <Text className="text-black font-semibold text-lg">{event.name}</Text>
                <Text className="text-black font-light tracking-wide max-h-[46%]">{event.desc}</Text>
                <View className="absolute flex-1 flex-row self-start w-full bottom-0">
                    {
                        event.tags.map((tag, index) => <TagCard tag={tag} key={index} />)
                    }
                </View>
            </View>
        </View>
    )
}