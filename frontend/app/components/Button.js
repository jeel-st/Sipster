import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../constants/styles';

const Button = ({ title, navigation }) => {
    return (
        <TouchableOpacity className="px-4 py-2 rounded-lg text-center mt-5 w-[160px]"
            style={{ backgroundColor: Colors.yellow }}
            onPress={navigation}
        >
            <Text className="text-center">{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;