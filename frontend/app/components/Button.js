import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../constants/styles';

const Button = ({ title, navigation }) => {
    return (
        <TouchableOpacity className="px-6 py-4 rounded-3xl shadow-md shadow-black text-center mt-5 w-[200px] "
            style={{ backgroundColor: Colors.yellow }}
            onPress={navigation}
        >
            <Text className="text-center font-bold">{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;