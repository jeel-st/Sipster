import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* Frontend Component für den CheckButton */
export default function CheckButton({ change }) {

    return (
        <TouchableOpacity onPress={change}>
            <View className="justify-center items-center pr-1 w-10 h-10 rounded-full bg-yellow ml-3">
                <Ionicons name="checkmark-done" size={30} color="black" />
            </View>
        </TouchableOpacity>
    )

}