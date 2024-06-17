import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'
import HomeFriends from './HomeFriends'
import { navigateToFriendsPage } from '../../utils/navigator'
import { FontAwesome5 } from '@expo/vector-icons'

export default function HomeHeader({displayFriend, handleFriendSelection}) {
    return (
        <View>
            {/* Header Text and Friendsmenu Button */}
            <View className={classNames(
                'flex-row justify-between', // position
                'mt-4 mx-6' // spacing
            )}>

                {/* Sipster Logo */}
                <Image style={{ width: 100, height: 50, resizeMode: 'contain' }} source={require('../../assets/images/logo-small.png')} />

                {/* Friendsmenu Button */}
                <TouchableOpacity
                    onPress={navigateToFriendsPage}
                    className='justify-center items-center' >

                    <FontAwesome5 name="user-friends" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Friend controller tab bar */}
            <HomeFriends
                displayFriend={displayFriend}
                handleFriendSelection={handleFriendSelection}
            />

            {/* Separation line */}
            <View className={classNames(
                'w-full h-[2px]', // sizing
                'bg-secondary' // styling
            )} />
        </View>
    )
}