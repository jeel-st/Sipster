import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { navigateToFriendsPage } from '../utils/navigator'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import useUser from '../utils/database/userFetcher'
import { FriendsScrollView, HomeFriends } from '../components'

export default function PartyPage() {
    const user = useUser()

    return (
        <SafeAreaView className={classNames(
            'flex-1',
            'bg-primary'
        )}>
            {/* Blurred Background with Gradient*/}
            <Image
                source={{ uri: `http://85.215.71.124/static/gamePictures/BeerPong.jpg?${new Date().getDate()}` }}
                blurRadius={10}
                className={classNames(
                    'absolute top-0 left-0',
                    'w-full h-[55%]'
                )} />
            <LinearGradient
                colors={['transparent', 'rgba(36,36,36,0.9)', 'rgba(36,36,36, 1)']}
                start={{ x: 0.5, y: 0.2 }}
                end={{ x: 0.5, y: 1 }}
                className={classNames(
                    'absolute top-0 left-0',
                    'w-full h-[55%]'
                )} />

            {/* Header Text and Info Button */}
            <View className={classNames(
                'flex-row justify-between',
                'mt-4 mx-6')}>

                {/* Sipster Logo */}
                <Image source={require('../assets/images/logo-small.png')} />

                {/* Info Button */}
                <TouchableOpacity
                    onPress={navigateToFriendsPage}
                    className={classNames(
                        'justify-center items-center')}>

                    <Feather name="info" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* Gameinfo Text */}
            <View className={classNames(
                'justify-start items-center',
                'mt-28',
            )}>
                <Text className={classNames(
                    'text-white text-center text-3xl font-bold tracking-wider')}>
                    Beer Pong
                </Text>
                <Text className={classNames(
                    'text-neutral-400 text-center font-semibold',
                    'mt-2 mb-32')}>
                    Spielzeit • 30 min
                </Text>

                {/* Tagged Friendlist */}
                {user && <FriendsScrollView friends={user.friends} user={user} />}

                <Text className={classNames(
                    'text-neutral-400 text-center font-semibold',
                    'mt-2')}>
                    Friends don't have to accept the invitation.
                </Text>

                <TouchableOpacity className={classNames(
                    'justify-center items-center',
                    'mt-4',
                    'h-12 w-[80%]',
                    'bg-white rounded-full shadow-md shadow-black'
                )}>
                    <Text className={classNames('text-black text-xl font-bold')}>Invite Friends</Text>
                </TouchableOpacity>

                <TouchableOpacity className={classNames(
                    'justify-center items-center',
                    'mt-12',
                    'h-12 w-[80%]',
                    'bg-yellow rounded-full shadow-md shadow-black'
                )}>
                    <Text className={classNames('text-black text-xl font-bold')}>Start Game</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}