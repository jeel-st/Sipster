import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { classNames } from '../../utils'

/*
    FriendsTabButton is a component that represents a tab button in the friends page.
    It displays a button with the title of the tab.
    Typ: Component from friends

    @param title:     string -> the title of the tab
    @param isSelected: boolean -> whether the tab is selected
    @param onClick:   function -> the function to call when the tab is clicked
    @return:          JSX -> returns the FriendsTabButton component
*/
export default function FriendsTabButton({ title, isSelected, onClick }) {
    return (
        <TouchableOpacity className={classNames(
            'flex items-center justify-center', // position
            'px-4 mr-2', // spacing
            'h-8', // sizing
            'rounded-3xl shadow-md shadow-black', // styling
            isSelected ? 'bg-yellow' : 'bg-secondary' // styling
        )}
            onPress={onClick}
        >
            <Text
                className={classNames(
                    'text-center font-semibold text-white', // styling
                    isSelected ? 'text-black' : 'text-white' // styling
                )}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}