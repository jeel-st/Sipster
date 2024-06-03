// Imports
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { classNames } from '../../utils';

/* 
This component renders a Checkbutton.
Typ: Component from settings 

@ change     -> Executes a specific function.
*/
export default function CheckButton({ change }) {

    return (
        <TouchableOpacity onPress={change}>
            <View className={classNames(
                'justify-center items-center', // position
                'pr-1 ml-3', // spacing
                'w-10 h-10', // sizing
                'rounded-full bg-yellow' // styling
            )}>
                <Ionicons name="checkmark-done" size={30} color="black" />
            </View>
        </TouchableOpacity>
    )

}