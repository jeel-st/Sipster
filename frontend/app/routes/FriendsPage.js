import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { styles } from '../constants'
import { FriendsHeaderButtons, FriendsCategorys, FriendsContainer } from '../components'
import React, { useEffect, useState } from 'react';
import useUser from '../utils/userFetcher'
import { fetchFriendsInvitations } from '../utils/friendsFetcher'

export default function FriendsPage() {
    const user = useUser();

    const [searchText, setSearchText] = useState('');
    const [selectedTab, setSelectedTab] = useState(0)
    const [viewFriends, setViewFriends] = useState(null)
    const [viewCategorys, setViewCategorys] = useState(true)

    const handleSearchTextChange = (text) => {
        setSearchText(text);

        if (text.trim() === "") {
            setViewCategorys(true)
            setViewFriends(user.friends)
        }
        else {
            setViewCategorys(false)
            setSelectedTab(0)
        }
    };

    const handleTabChange = async (tabIndex) => {
        setSelectedTab(tabIndex);
        // preventing ghost user
        setViewFriends([])

        const invitations = await fetchFriendsInvitations(user.username)

        switch (tabIndex) {
            case 0:
                setViewFriends(user.friends)
                break
            case 1:
                setViewFriends(invitations[0])
                break
            case 2:
                setViewFriends(invitations[1])
        }
    };

    useEffect(() => {
        if (user) {
            setViewFriends(user.friends);
        }
    }, [user]);

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
                        <FriendsContainer friends={viewFriends} searchText={searchText} user={user} selectedTab={selectedTab} />
                    </>
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}