import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { navigateToFriendsPage } from '../utils/navigator'
import { FontAwesome5, Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import useUser from '../utils/database/userFetcher'
import { FriendsScrollView } from '../components'

const { width, height } = Dimensions.get('window');

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
                    'w-full h-[50%]'
                )} />
            <LinearGradient
                colors={['transparent', 'rgba(36,36,36,0.9)', 'rgba(36,36,36, 1)']}
                start={{ x: 0.5, y: 0.2 }}
                end={{ x: 0.5, y: 1 }}
                className={classNames(
                    'absolute top-0 left-0',
                    'w-full h-[50%]'
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
            <View>
                <Text className={classNames(
                    'text-white text-center text-3xl font-bold tracking-wider',
                    'mt-24')}>
                    Beer Pong
                </Text>
                <Text className={classNames(
                    'text-neutral-400 text-center font-semibold',
                    'mt-2')}>
                    Spielzeit • 30 min
                </Text>
            </View>

            {/* Tagged Friendlist */}
            <View className={classNames(
                'flex-1 justify-center items-center',
                'mt-10'
            )}>
                { user && <FriendsScrollView friends={user.friends} user={user} /> }
            </View>
        </SafeAreaView>
    )
}