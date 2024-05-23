// Imports
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, TouchableOpacity } from "react-native";

/*
This button displays a customised icon and navigates to a new page.
Typ: Component from layout

@ icon 
@ navigation 
*/
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