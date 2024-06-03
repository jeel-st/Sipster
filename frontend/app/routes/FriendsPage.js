import { View, Text, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { styles } from '../constants'
import { FriendsHeaderButtons, FriendsCategorys, FriendsContainer } from '../components'
import React from 'react';
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import { useFriends } from '../utils/hooks/friends/useFriends'

/*
    FriendsPage is a page that displays the friends and allows the user to search and view friends.
    Typ: Page/route

    @return: JSX -> returns the FriendsPage component
*/
export default function FriendsPage() {
    const { user, searchText, selectedTab, viewFriends, viewCategorys, handleSearchTextChange, handleTabChange, handleReloadFriends } = useFriends();

    if (Platform.OS === 'android') {
        setBackgroundColorAsync(styles.Colors.primary);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className={classNames(
                'flex-1',
                'bg-primary',
            )}>
                {user && (
                    <>
                        {/* Header Buttons*/}
                        <FriendsHeaderButtons onSearchTextChange={handleSearchTextChange} />

                        {/* Heading Text*/}
                        <View className={classNames('px-4 pt-4')}>
                            <Text className={styles.brandingText}>Friends</Text>
                        </View>

                        {/* Friends Categorys*/}
                        {viewCategorys && <FriendsCategorys selectedTab={selectedTab} onTabChange={handleTabChange} />}

                        {/* Friends Content*/}
                        <FriendsContainer friends={viewFriends} searchText={searchText} user={user} selectedTab={selectedTab} handleReloadFriends={handleReloadFriends} />
                    </>
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}