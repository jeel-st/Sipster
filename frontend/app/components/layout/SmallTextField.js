// Imports
import { View, TextInput } from 'react-native';
import React from 'react';
import { classNames } from '../../utils';

/* 
This is a small text field.
Typ: Component from layout

@param placeholder:     string -> Specifies what should be entered in the text field e.g. username.
@param onChangeText:    function -> A function that saves the input in a variable is saved here.
@param value:           string -> The entry is saved and displayed here.
@param hideText:        boolean-> The input is not made legible by dots, for example when entering passwords. 
@return:                JSX -> returns a small textfield component
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