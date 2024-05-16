import React from 'react';
import { FontAwesome } from '@expo/vector-icons'
import { View, TouchableOpacity } from "react-native"

const IconButton = ({ icon, navigation }) => {
    return (
        <TouchableOpacity onPress={navigation}>
            <View className="justify-center items-center pr-1 w-10 h-10 rounded-xl bg-secondary">
                <FontAwesome name={icon} size={24} color="white" />
            </View>
        </TouchableOpacity>
    );
};

export default IconButton;