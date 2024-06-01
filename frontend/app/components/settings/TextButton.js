// Imports
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from "react-native";
import React from 'react';
import { classNames } from '../../utils';

/* 
This component renders a button with an icon and text.
Typ: Component from settings 

@ title
@ icon
@ color
@ content     -> Executes a specific function.
*/
export default function TextButton({ title, icon, color, content }) {
    return (
        <View className={classNames(
            'flex-row items-center', // position
            'mt-2' // spacing
        )}>
            <Ionicons name={icon} size={25} color={color} style={{ marginRight: 10 }} />
            <TouchableOpacity onPress={content}>
                <Text className={('font-bold text-l')} style={{ color: color }}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}