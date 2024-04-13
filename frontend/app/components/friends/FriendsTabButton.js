import { Text, TouchableOpacity } from 'react-native'
import { styles } from '../../constants'
import React from 'react'

export default function FriendsTabButton({ title, isSelected, onClick }) {
    return (
        <TouchableOpacity className="flex items-center justify-center rounded-3xl shadow-md shadow-black h-8 px-4 mr-2"
            style={{ backgroundColor: isSelected ? styles.Colors.yellow : styles.Colors.secondary }}
            onPress={onClick}
        >
            <Text
                className="text-center font-semibold text-white"
                style={{ color: isSelected ? styles.Colors.black : styles.Colors.white}}>
                {title}</Text>
        </TouchableOpacity>
    )
}