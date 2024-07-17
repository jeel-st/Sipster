// Imports
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { classNames } from '../../utils';

/* 
This button displays a customised text and navigates to a new page. 
This is the main button, which is assigned the CI colours of the Sipster brand.
Typ: Component from layout

@param title:           string -> title of the button
@param navigation:      function -> navigates to a new page
@return:                JSX -> returns a sispter button
*/
export default function SipsterButton({ title, navigation }) {
    return (
        <TouchableOpacity className={classNames(
            'text-center', // position
            'px-6 py-4 mt-5', // spacing 
            'w-[200px]', // sizing
            'rounded-3xl shadow-md shadow-black bg-yellow' // styling
        )}
            onPress={navigation}
        >
            <Text className={classNames(
                'text-center', // position
                'font-bold' // styling
            )}>
                {title}</Text>
        </TouchableOpacity>
    );
};

