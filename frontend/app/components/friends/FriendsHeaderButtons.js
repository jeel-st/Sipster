import { View, Pressable, TextInput, Keyboard, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { classNames } from '../../utils'
import { router } from 'expo-router'
import { styles } from '../../constants'
import React, { useRef, useState } from 'react'

export default function FriendsHeaderButtons({ onSearchTextChange }) {
    const [buttonVisible, setButtonVisible] = useState(false);

    const inputRef = useRef(null);

    const handleTextChange = (inputText) => {
        onSearchTextChange(inputText)
        setButtonVisible(inputText.length > 0)
    }

    const handleCloseButtonPress = () => {
        Keyboard.dismiss()
        inputRef.current.clear()
        onSearchTextChange('')
        setButtonVisible(false)
    };

    return (
        <View className={classNames(
            'flex-row justify-between items-center',
            'px-4',
            'w-full h-16',
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
                    'flex-1 flex-row items-center justify-between',
                    'px-4 mx-4',
                    'h-10',
                    'rounded-xl bg-secondary',
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
                            'flex-row items-center justify-between',
                            'px-4',
                            'h-10',
                            'rounded-xl bg-secondary',
                        )}>
                        <FontAwesome name="close" size={24} color="white" />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}