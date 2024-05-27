// Imports
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* 
This component displays the general Settingsbutton where you can change specific information such as the username.
Typ: Component from settings 

@ title
@ onPress       -> Executes a specific function.
*/
export default function SettingsButton({ title, onPress }) {
    return (
        <TouchableOpacity className="shadow-md shadow-black w-[340px] rounded-xl bg-secondary mt-3" onPress={onPress}>

            <View className="flex-row mt-2 mb-2 items-center ">
                <Ionicons name="add-circle-outline" size={25} color="white" style={{ marginRight: 20, marginLeft: 6 }} />
                <Text className="text-white text-l tracking-widest">{title}</Text>
            </View>
        </TouchableOpacity>
    );
};