import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../constants/styles';

export default function RedButton({ title, navigation }) {
    return (
        <TouchableOpacity
            className="px-6 py-4 rounded-3xl w-[200px] text-center border-2 border-red-500"
            onPress={navigation}
        >
            <Text style="text-center font-bold">{title}</Text>
        </TouchableOpacity>
    );
};