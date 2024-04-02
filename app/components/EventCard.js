import { View, Text } from 'react-native'
import React from 'react'

export default function EventCard({event}) {
    return (
        <View className="h-10 m-1 rounded-xl shadow-xl shadow-black" style={{ backgroundColor: '#343434' }}>
            <View className="flex flex-row justify-between items-center mx-5">
                <Text className="text-white font-bold text-xl">{event.date}</Text>
                <Text className="text-white font-bold text-xl">{event.name}</Text>
                <Text className="text-white font-bold text-xl">{event.time}</Text>
            </View>
        </View>
    )
}