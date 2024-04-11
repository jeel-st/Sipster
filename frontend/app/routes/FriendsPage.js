import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { styles } from '../constants'

export default function FriendsPageNew() {
    return (
        <SafeAreaView className={classNames(
            'flex-1',
            'bg-primary',
        )}>
            {/* Header Buttons*/}
            <View className={classNames(
                'flex-row justify-between items-center',
                'px-4',
                'w-full h-16',
            )}>
                {/* Back Button*/}
                <Pressable>
                    <View className={classNames(
                        'justify-center items-center',
                        'pr-1',
                        'w-10 h-10',
                        'rounded-xl bg-secondary',
                    )}>
                        <FontAwesome
                            name="chevron-left"
                            size={24}
                            color="white"
                        />
                    </View>
                </Pressable>

                {/* Search Button*/}
                <Pressable>
                    <View className={classNames(
                        'justify-center items-center',
                        'w-10 h-10',
                        'rounded-xl bg-secondary',
                    )}>
                        <FontAwesome
                            name="search"
                            size={24}
                            color="white"
                        />
                    </View>
                </Pressable>
            </View>

            {/* Heading Text*/}
            <View className={classNames(
                'px-4 pt-4'
            )}>
                <Text className={styles.brandingText}>Friends</Text>
            </View>
        </SafeAreaView>
    )
}