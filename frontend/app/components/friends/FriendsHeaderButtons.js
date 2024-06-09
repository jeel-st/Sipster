import { View, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { classNames } from '../../utils'
import { router } from 'expo-router'
import { styles } from '../../constants'
import React, { useRef } from 'react'
import { useFriendsHeaderButtons } from '../../utils/hooks/friends/useFriendsHeaderButtons'

/*
    FriendsHeaderButtons is a component that represents the header buttons in the friends page.
    It displays a back button, a search bar, and a close button.
    Typ: Component from friends

    @param onSearchTextChange: function -> the function to call when the search text changes
    @return:                   JSX -> returns the FriendsHeaderButtons component
*/
export default function FriendsHeaderButtons({ onSearchTextChange }) {
    const inputRef = useRef(null);
    const {handleTextChange, handleCloseButtonPress, buttonVisible} = useFriendsHeaderButtons({onSearchTextChange, inputRef})

    return (
        <View className={classNames(
            'flex-row justify-between items-center', // position
            'px-4', // spacing
            'w-full h-16', // sizing
        )}>
            {/* Back Button*/}
            <TouchableOpacity onPress={() => router.back()}>
                <View className={classNames(
                    'justify-center items-center', // position
                    'pr-1', // spacing
                    'w-10 h-10', // sizing
                    'rounded-xl bg-secondary', // styling
                )}>
                    <FontAwesome name="chevron-left" size={24} color="white" />
                </View>
            </TouchableOpacity>

            {/* Search Bar*/}
            <TouchableOpacity
                onPress={() => inputRef.current.focus()}
                className={classNames(
                    'flex-1 flex-row items-center justify-between', // position
                    'px-4 mx-4', // spacing
                    'h-10', // sizing
                    'rounded-xl bg-secondary', // styling
                )}>
                <TextInput
                    ref={inputRef}
                    placeholder='Search Friends'
                    placeholderTextColor={styles.Colors.white}
                    maxLength={20}
                    onChangeText={handleTextChange}
                    className={classNames( 'text-white' )} />
                <FontAwesome name="search" size={24} color="white" />
            </TouchableOpacity>

            {/* Close Button*/}
            {
                buttonVisible && (
                    <TouchableOpacity
                        onPress={handleCloseButtonPress}
                        className={classNames(
                            'flex-row items-center justify-between', // position
                            'px-4', // spacing
                            'h-10', // sizing
                            'rounded-xl bg-secondary', // styling
                        )}>
                        <FontAwesome name="close" size={24} color="white" />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}