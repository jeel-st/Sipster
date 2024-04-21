import { View, Text, Pressable } from 'react-native'
import { styles } from '../../constants'
import React from 'react'

export default function EventCard({ event, onClick, isSelected }) {
    return (
        <Pressable onPress={onClick} className="h-10 m-1 rounded-xl shadow-sm shadow-black overflow-visible mx-5 justify-center" style={[
            {
                borderWidth: isSelected ? 1 : 0,
                borderColor: styles.Colors.yellow,
            },
            {
                backgroundColor: styles.Colors.secondary,
            },
        ]}>
            <View className="flex flex-row justify-between items-center mx-5">
                <Text className={styles.H3Text}>{event.date}</Text>
                <Text className={styles.H3Text}>{event.name}</Text>
                <Text className={styles.H3Text}>{event.time}</Text>
            </View>
        </Pressable>
    )
}