import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '../constants/styles';
import { NavigationContainer } from '@react-navigation/native';

const Button = ({ title }) => {
    return (
        <TouchableOpacity className="px-4 py-2 rounded-lg text-center mt-5" style={{ backgroundColor: Colors.yellow }}>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;