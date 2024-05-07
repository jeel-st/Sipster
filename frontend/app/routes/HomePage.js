import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { styles } from '../constants'
import { navigateToFriendsPage } from '../utils/navigator'
import { FontAwesome5 } from '@expo/vector-icons'
import { HomeActivityCard, HomeActivityCard2, HomeFriends } from '../components'

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
                            <HomeActivityCard friend={user.friends[0]} />
                            <HomeActivityCard friend={user.friends[1]} />
                            <HomeActivityCard friend={user.friends[2]} />
                        </ScrollView>
                    </>
                }

            </View>
        </SafeAreaView>
    )
}