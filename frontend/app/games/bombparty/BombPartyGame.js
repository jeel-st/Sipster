import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import useBombParty from './utils/useBombParty'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import classNames from '../bombparty/utils/classNames'
import { router } from 'expo-router';

export default function BombPartyGame() {
    const { isPlaying, category, handleStartGame } = useBombParty()

    return (
        <View className={classNames(
            'flex-1',
        )}>
            {/* Header Text and Close Button */}
            <View className={classNames(
                'flex-row justify-between',
                'mt-4 mx-6')}>

                {/* Sipster Logo */}
                <Image source={require('../bombparty/assets/images/logo-small.png')} />

                {/* Close Button */}
                <TouchableOpacity
                    onPress={() => { router.navigate('(tabs)/games')}}
                    className={classNames(
                        'justify-center items-center')}>

                    <AntDesign name="close" size={34} color="white" />
                </TouchableOpacity>
            </View>

            <View className={classNames(
                'flex-1 justify-around items-center',
                'mx-6 my-4',
                'bg-secondary rounded-3xl'
            )}>
                <View className={classNames(
                    'justify-end items-center',
                    'space-y-10',
                    'w-full'
                )}>
                    <Text className={classNames(
                        'font-bold text-3xl text-white',
                    )}>
                        Bomb Party Game
                    </Text>

                    <TouchableOpacity onPress={handleStartGame} disabled={isPlaying}>
                        <FontAwesome5 name="bomb" size={200} color="white" />
                    </TouchableOpacity>
                </View>

                <View className={classNames(
                    'flex justify-center items-center',
                    'py-8 px-2',
                    'w-[90%]',
                    'bg-primary rounded-3xl'
                )}>
                    <Text className={classNames('text-7xl text-yellow font-bold')}>
                        Go!
                    </Text>
                    <Text className={classNames('text-2xl text-yellow font-light')}>
                        {isPlaying ? `Nenne: ${category}` : "Detonate the bomb"}
                    </Text>
                </View>
            </View>
        </View>
    )
}