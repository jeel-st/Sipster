import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import classNames from '../utils/classNames'

export default function Category({ handlePress, category, challenge, isReady }) {
    return (
        <View className={classNames(
            'flex justify-center items-center',
            'mt-4',
            'w-[90%] h-[70%]',
            'bg-primary rounded-3xl'
        )}>
            <View className={classNames(
                'flex justify-center items-center',
                'w-full h-[69%]'
            )}>
                <Text className={classNames('text-9xl text-yellow font-bold')}>
                    {!isReady && category.emoji}
                </Text>

                <Text className={classNames('text-4xl text-yellow font-bold')}>
                    {!isReady && category.name}
                    {isReady && challenge}
                </Text>
            </View>

            <View className={classNames('w-full h-[1%]', 'bg-secondary',)} />

            <TouchableOpacity
                onPress={handlePress}
                className={classNames(
                    'flex justify-center items-center',
                    'p-2',
                    'w-full h-[30%]'
                )}>
                {!isReady &&
                    <Text className={classNames('text-2xl text-white font-bold')}>
                        Click when ready
                    </Text>
                }
                {isReady &&
                    <Text className={classNames('text-2xl text-white font-bold')}>
                        Continue
                    </Text>
                }

            </TouchableOpacity>
        </View>
    )
}