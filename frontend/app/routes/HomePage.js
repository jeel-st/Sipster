import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { events, styles } from '../constants'
import { navigateToFriendsPage } from '../utils/navigator'
import { FontAwesome5 } from '@expo/vector-icons'
import { EventInfoCard, Events, HomeActivityCard, HomeActivityCard2, HomeFriends } from '../components'

export default function HomePage({ user, displayFriend, handleFriendSelection }) {
    return (
        <SafeAreaView className={classNames(
            'flex-1',
            'bg-primary',
        )}>
            <View className={classNames('')}>
                {/* Header */}
                <View className={classNames(
                    'flex-row justify-between',
                    'mt-4 mx-6'
                )}>
                    <Text className={styles.brandingText}>sipster</Text>

                    {/* Friendsmenu Button */}
                    <TouchableOpacity
                        onPress={navigateToFriendsPage}
                        className={classNames(
                            'justify-center items-center'
                        )}>
                        <FontAwesome5 name="user-friends" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {
                    user &&
                    <>
                        {/* Friend controller tab bar */}
                        <HomeFriends user={user} displayFriend={displayFriend} handleFriendSelection={handleFriendSelection} />

                        {/* Separation line */}
                        <View className={classNames('w-full h-[2px] bg-secondary')} />

                        {/* Content ScrollView */}
                        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}>
                            {
                                displayFriend === 0 &&
                                user.friends.map((friend, index) => {
                                    return (
                                        <View key={index}>
                                            <HomeActivityCard friend={friend} />

                                            {/* Separation line */}
                                            < View className={classNames('w-full h-[2px] mt-4 bg-secondary')} />

                                            {/* Füge die EventInfoCard und Events abwechselnd ein */}
                                            {index % 2 ?
                                                <Events onSelectEvent={() => { }} selectedEvent={events[index]} />
                                                : <EventInfoCard event={events[index]} />
                                            }

                                            {/* Füge die Separation Line hinzu, außer beim letzten Element */}
                                            {index !== user.friends.length - 1 &&
                                                <View className={classNames('w-full h-[2px] mt-4 bg-secondary')} />
                                            }
                                        </View>
                                    )
                                }
                                )
                            }
                            {
                                displayFriend !== 0 &&
                                <HomeActivityCard friend={user.friends[displayFriend]} />
                            }
                        </ScrollView>
                    </>
                }

            </View>
        </SafeAreaView>
    )
}