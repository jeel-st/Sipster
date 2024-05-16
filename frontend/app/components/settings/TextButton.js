// Imports
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from "react-native"
import React from 'react';
import { styles } from '../../constants'

// This component renders a button with an icon and text. 
// The component has variable content such as color, icon, title and content.
export default function TextButton({title, icon, color, content}) {

    return (
        <View className="flex-row mt-2 items-center">
            <Ionicons name={icon} size={25} color={color} style={{ marginRight: 10 }} />
            <TouchableOpacity onPress={content}>
                <Text className={styles.H3Text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}