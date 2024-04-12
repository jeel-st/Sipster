import { View, Pressable, TextInput, Keyboard } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { classNames } from '../../utils'
import React, { useRef, useState } from 'react'
import { router } from 'expo-router'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import { styles } from '../../constants'

export default function FriendsHeaderButtons({onSearchTextChange}) {
    const inputRef = useRef(null);

    const width = useSharedValue(40)
    const isActive = useSharedValue(false)

    const startAnimation = () => {
        if (isActive.value) {
            width.value = withTiming(40)
            isActive.value = false

            Keyboard.dismiss()
            inputRef.current.clear()
            onSearchTextChange('')
        }
        else {
            width.value = withTiming(300)
            isActive.value = true

            inputRef.current.focus()
        }
    }

    return (
        <View className={classNames(
            'flex-row justify-between items-center',
            'px-4',
            'w-full h-16',
        )}>
            {/* Back Button*/}
            <Pressable onPress={() => router.back()}>
                <View className={classNames(
                    'justify-center items-center', // position
                    'pr-1', // spacing
                    'w-10 h-10', // sizing
                    'rounded-xl bg-secondary', // styling
                )}>
                    <FontAwesome
                        name="chevron-left"
                        size={24}
                        color="white"
                    />
                </View>
            </Pressable>

            <View className={classNames( 'flex-row items-center', )}>
                {/* Search Button*/}
                <Pressable
                    className={classNames(
                        'z-20 absolute justify-center items-center right-0',
                        'h-10 w-10',
                        'rounded-xl bg-secondary',
                    )}
                    onPress={startAnimation}>
                    <FontAwesome name="search" size={24} color="white" />
                </Pressable>

                {/* Animated Search */}
                <Animated.View
                    className={classNames(
                        'justify-center items-center',
                        'h-10 w-[300px]',
                        'rounded-xl bg-secondary',
                    )}
                    style={{ width: width }}>
                        <TextInput
                            ref={inputRef}
                            placeholder='Search Friends'
                            placeholderTextColor={styles.Colors.white}
                            maxLength={20}
                            onChangeText={onSearchTextChange}
                            className={classNames( 'text-white' )}/>
                </Animated.View>

            </View>

        </View>
    )
}