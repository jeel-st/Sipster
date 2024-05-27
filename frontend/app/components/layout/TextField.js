// Imports
import { View, TextInput } from 'react-native';
import React from 'react';
import { styles } from '../../constants';

/* 
This is a normal text field.
Typ: Component from layout

@ placeholder       -> Specifies what should be entered in the text field e.g. username.
@ onChangeText      -> A function that saves the input in a variable is saved here.
@ value             -> The entry is saved and displayed here.
@ hideText          -> The input is not made legible by dots, for example when entering passwords.  
*/
export default function TextField({ placeholder, onChangeText, value, hideText }) {
    return (
        <View>
            <TextInput
                className="h-10 m-1 rounded-xl shadow-md shadow-black w-64 text-white pl-2"
                style={{ backgroundColor: styles.Colors.secondary }}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize="none"
                secureTextEntry={hideText}
            />
        </View>
    )
}