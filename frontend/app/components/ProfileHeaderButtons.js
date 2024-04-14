import { View, TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { classNames } from '../utils'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileHeaderButtons() {
    return (
        <View>
            <SafeAreaView className={classNames(
                'absolute z-20 flex-row justify-between items-center',
                'px-4',
                'w-full mt-[-16px]',
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

                <View className={classNames(
                    'flex-row',
                    'space-x-4'
                )}>
                    {/* Share Button*/}
                    <TouchableOpacity onPress={() => console.log("Profile Share Button")}>
                        <View className={classNames(
                            'justify-center items-center',
                            'w-10 h-10',
                            'rounded-xl bg-secondary',
                        )}>
                            <Entypo name="share" size={24} color="white" />
                        </View>
                    </TouchableOpacity>

                    {/* Settings Button*/}
                    <TouchableOpacity onPress={() => console.log("Profile Settings Button")}>
                        <View className={classNames(
                            'justify-center items-center',
                            'w-10 h-10',
                            'rounded-xl bg-secondary',
                        )}>
                            <Entypo name="dots-three-horizontal" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}