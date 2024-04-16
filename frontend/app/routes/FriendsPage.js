import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { classNames } from '../utils'
import { styles } from '../constants'
import { FriendsHeaderButtons, FriendsCategorys, FriendsContent } from '../components'
import React, { useEffect, useState } from 'react';
import useUser from '../utils/userFetcher'

export default function FriendsPage() {
    const user = useUser();

    const [searchText, setSearchText] = useState('');
    const [selectedTab, setSelectedTab] = useState(0)
    const [viewFriends, setViewFriends] = useState(null)

    const handleSearchTextChange = (text) => {
        setSearchText(text);
    };

    const handleTabChange = (tabIndex) => {
        setSelectedTab(tabIndex);

        switch (tabIndex) {
            case 0:
                setViewFriends(user.friends)
                break
            case 1:
                setViewFriends(user.friends)
                break
            case 2:
                setViewFriends(user.friends)
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
                    <FriendsCategorys selectedTab={selectedTab} onTabChange={handleTabChange} />

                    {/* Friends Content*/}
                    <FriendsContent friends={viewFriends} searchText={searchText} user={user}/>
                </>
            )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}