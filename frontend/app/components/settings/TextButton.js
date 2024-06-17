// Imports
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from "react-native";
import React from 'react';
import { classNames } from '../../utils';

/* 
This component renders a button with an icon and text.
Typ: Component from settings 

@param title:       string -> title of the button 
@param icon:        string -> a specific icon 
@param color:       string -> color of the button and icon 
@param content:     function -> Executes a specific function.
@return:            JSX -> returns a TextButton with a specific icon
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