import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { styles } from '../constants'
import { FriendsHeaderButtons, FriendsCategorys, FriendsContainer } from '../components'
import React from 'react';
import { useFriends } from '../utils/hooks/friends/useFriends'
import { navBarColor } from '../utils/navBarColor'

/*
    FriendsPage is a page that displays the friends and allows the user to search and view friends.
    Typ: Page/route

    @return: JSX -> returns the FriendsPage component
*/
export default function FriendsPage() {
    const { searchText,
        selectedTab,
        viewFriends,
        viewCategorys,
        searchFriendsVisible,
        searchFriends,
        filteredFriends,
        handleSearchTextChange,
        handleTabChange,
        handleReloadFriends } = useFriends();

    navBarColor(styles.Colors.primary)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className={classNames(
                'flex-1',
                'bg-primary',
            )}>
                {/* Header Buttons*/}
                <FriendsHeaderButtons onSearchTextChange={handleSearchTextChange} />

                {/* Heading Text*/}
                <View className={classNames('px-4 pt-4')}>
                    <Text className={styles.brandingText}>Friends</Text>
                </View>

                {/* Friends Categorys*/}
                {viewCategorys && <FriendsCategorys selectedTab={selectedTab} onTabChange={handleTabChange} />}

                {/* Friends Content*/}
                <FriendsContainer
                    friends={viewFriends}
                    searchText={searchText}
                    selectedTab={selectedTab}
                    handleReloadFriends={handleReloadFriends}
                    searchFriendsVisible={searchFriendsVisible}
                    searchFriends={searchFriends}
                    filteredFriends={filteredFriends} />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}