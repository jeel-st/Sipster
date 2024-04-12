import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { styles, friends, friendsReceived, friendsSent } from '../constants'
import { FriendsHeaderButtons, FriendsCategorys, FriendsContent } from '../components'
import React, { useState } from 'react';

export default function FriendsPageNew() {
    const [selectedTab, setSelectedTab] = useState(0)
    const [viewFriends, setViewFriends] = useState(friends)

    const handleTabChange = (tabIndex) => {
        setSelectedTab(tabIndex);

        switch (tabIndex) {
            case 0:
                setViewFriends(friends)
                break
            case 1:
                setViewFriends(friendsReceived)
                break
            case 2:
                setViewFriends(friendsSent)
        }
      };

    return (
        <SafeAreaView className={classNames(
            'flex-1',
            'bg-primary',
        )}>
            {/* Header Buttons*/}
            <FriendsHeaderButtons/>

            {/* Heading Text*/}
            <View className={classNames( 'px-4 pt-4' )}>
                <Text className={styles.brandingText}>Friends</Text>
            </View>

            {/* Friends Categorys*/}
            <FriendsCategorys selectedTab={selectedTab} onTabChange={handleTabChange}/>

            {/* Friends Content*/}
            <FriendsContent friends={viewFriends}/>
        </SafeAreaView>
    )
}