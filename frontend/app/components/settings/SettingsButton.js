// Imports
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { classNames } from '../../utils';

/* 
This component displays the general Settingsbutton where you can change specific information such as the username.
Typ: Component from settings 

@ title
@ onPress       -> Executes a specific function.
*/
export default function SettingsButton({ title, onPress }) {
    return (
        <TouchableOpacity className={classNames(
            'mt-3', // spacing
            ' w-[340px]', // sizing
            'shadow-md shadow-black rounded-xl bg-secondary' // styling
        )} onPress={onPress}>

            <View className={classNames(
                'flex-row items-center', // position
                'mt-2 mb-2' // spacing
            )}>
                <Ionicons name="add-circle-outline" size={25} color="white" style={{ marginRight: 20, marginLeft: 6 }} />
                <Text className={('text-white text-l tracking-widest')}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};