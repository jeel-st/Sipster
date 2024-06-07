import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import classNames from '../beerpongExtreme/utils/classNames'
import { router } from 'expo-router';
import Category from './components/Category';
import useBeerPongExtreme from './utils/useBeerPongExtreme';

export default function BeerpongExtreme() {
    const { isPlaying, isReady, category, challenge, handleStartGame, handleIsReady } = useBeerPongExtreme()

    return (
        <View className={classNames(
            'flex-1',
        )}>
            {/* Header Text and Close Button */}
            <View className={classNames(
                'flex-row justify-between',
                'mt-4 mx-6')}>

                {/* Sipster Logo */}
                <Image source={require('../beerpongExtreme/assets/images/logo-small.png')} />
            </View>

            <View className={classNames(
                'flex-1 justify-around items-center',
                'mx-6 my-4',
                'bg-secondary rounded-3xl'
            )}>
                <Text className={classNames('font-bold text-3xl text-white')}>
                    Beerpong Extreme
                </Text>
                <Text className={classNames('text-4xl text-yellow font-bold')}>
                    Hit a Cup?
                </Text>

                {!isPlaying &&
                <View className={classNames(
                    'flex justify-center items-center',
                    'py-8 px-2 mt-4',
                    'w-[90%] h-[70%]',
                    'bg-primary rounded-3xl'
                )}>
                    <TouchableOpacity onPress={handleStartGame} disabled={isPlaying} className={classNames(
                        'w-96 h-96',
                    )}>
                        {/* Beerpong Cup */}
                        <Image className="w-full h-full" source={require('../beerpongExtreme/assets/images/beer-pong-illustration2.png')} />
                    </TouchableOpacity>
                </View>
                }
                {isPlaying && <Category handlePress={handleIsReady} category={category} challenge={challenge} isReady={isReady}/>}

                <TouchableOpacity
                    onPress={() => { router.navigate('(tabs)/games') }}
                    className={classNames(
                        'flex justify-center items-center',
                        'py-1 px-6 my-4',
                        'bg-yellow rounded-2xl'
                    )}>
                    <Text className={classNames('text-2xl text-black font-normal')}>
                        quit the game
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}