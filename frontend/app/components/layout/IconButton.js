// Imports
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, TouchableOpacity } from "react-native";
import { classNames } from '../../utils';

/*
This button displays a customised icon and navigates to a new page.
Typ: Component from layout

@ icon 
@ navigation 
*/
const IconButton = ({ icon, navigation }) => {
    return (
        <TouchableOpacity onPress={navigation}>
            <View className={classNames(
                'justify-center items-center', // position
                'w-10 h-10', // sizing
                'rounded-xl bg-secondary' // styling
            )}>
                <FontAwesome name={icon} size={24} color="white" />
            </View>
        </TouchableOpacity>
    );
};

export default IconButton;