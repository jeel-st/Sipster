import { View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { events } from '../constants'
import { navigateToFriendsPage } from '../utils/navigator'
import { FontAwesome5 } from '@expo/vector-icons'
import { EventInfoCard, Events, HomeActivityCard, HomeFriends } from '../components'
import useHome from '../utils/hooks/useHome'

export default function HomePage() {

    const { user, displayFriend, handleFriendSelection } = useHome()

    const Header = () => {
        return (
            <View>
                {/* Header Text and Friendsmenu Button */}
                <View className={classNames(
                    'flex-row justify-between',
                    'mt-4 mx-6')}>

                    {/* Sipster Logo */}
                    <Image source={require('../assets/images/logo-small.png')} />

                    {/* Friendsmenu Button */}
                    <TouchableOpacity
                        onPress={navigateToFriendsPage}
                        className={classNames(
                            'justify-center items-center')}>

                        <FontAwesome5 name="user-friends" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Friend controller tab bar */}
                <HomeFriends user={user} displayFriend={displayFriend} handleFriendSelection={handleFriendSelection} />

                {/* Separation line */}
                <View className={classNames(
                    'w-full h-[2px]',
                    'bg-secondary')} />
            </View>
        )
    }

    const Content = () => {
        if (displayFriend === 0) return (
            <ScrollView showsHorizontalScrollIndicator={false} >
                {
                    user.friends.map((friend, index) => {
                        return (
                            <View key={index}>
                                <HomeActivityCard friend={friend} />

                                {/* Separation line */}
                                <View className={classNames(
                                    'mt-4',
                                    'w-full h-[2px]',
                                    'bg-secondary')} />

                                {/* Füge die EventInfoCard und Events abwechselnd ein */}
                                {index % 2 ?
                                    <Events onSelectEvent={() => { }} selectedEvent={events[index]} />
                                    : <EventInfoCard event={events[index]} />}

                                {/* Füge die Separation Line hinzu, außer beim letzten Element */}
                                {index !== user.friends.length - 1 &&
                                    <View className={classNames(
                                        'mt-4',
                                        'w-full h-[2px]',
                                        'bg-secondary')} />
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
        else
            return (
                <ScrollView>
                    <HomeActivityCard friend={user.friends[displayFriend]} />
                </ScrollView>
            )
    }

    return (
        <SafeAreaView className={classNames(
            'flex-1',
            'bg-primary')}>

            {user && <Header />}
            {user && <Content />}
        </SafeAreaView>
    )
}