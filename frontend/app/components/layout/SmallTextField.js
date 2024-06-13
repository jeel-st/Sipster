// Imports
import { View, TextInput } from 'react-native';
import React from 'react';
import { classNames } from '../../utils';

/* 
This is a small text field.
Typ: Component from layout

@ placeholder       -> Specifies what should be entered in the text field e.g. username.
@ onChangeText      -> A function that saves the input in a variable is saved here.
@ value             -> The entry is saved and displayed here.
@ hideText          -> The input is not made legible by dots, for example when entering passwords.  
*/
export default function SmallTextField({ placeholder, onChangeText, value, hideText }) {
    return (
        <View>
            <TextInput
                className={classNames(
                    'm-1 pl-2', // spacing
                    'h-10 w-[122px]', // sizing
                    'rounded-xl shadow-md shadow-black text-white bg-secondary' // styling
                )}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize="none"
                secureTextEntry={hideText}
            />
        </View>
    )
}