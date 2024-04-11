import { View, ScrollView, Text } from 'react-native'
import FriendsTabButton from './FriendsTabButton'
import FriendsContainer from './FriendsContainer'
import React, { useState } from 'react';
import { friends, friendsReceived, friendsSent } from '../constants'

export default function FriendsTab({ searchText }) {
    const tabs = ["my friends", "received", "sent"]
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const [viewFriends, setViewFriends] = useState(friends)

    const handleEventClick = (tab) => {
        setSelectedTab(tab);
        switch (tab) {
            case tabs[0]:
                setViewFriends(friends)
                break
            case tabs[1]:
                setViewFriends(friendsReceived)
                break
            case tabs[2]:
                setViewFriends(friendsSent)
        }
    };

    let filteredFriends = viewFriends;
    if (searchText.trim() !== '') {
        filteredFriends = viewFriends.filter(friend => {
            return friend.sipsterid.startsWith(searchText.toLowerCase()) ||
                friend.fullname.toLowerCase().startsWith(searchText.toLowerCase())
        });
    }

    return (
        <View>
            <View className="flex-1 flex-row items-center mt-6">
                {
                    tabs.map((tab, index) => <FriendsTabButton
                        title={tab}
                        key={index}
                        onClick={() => handleEventClick(tab)}
                        isSelected={selectedTab === tab} />)
                }
            </View>
            {/* Friends Container */}
            <View className="mt-10">
                <Text className="text-white font-thin mb-4">you have {filteredFriends.length} friends</Text>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 260 }}>
                    {
                        filteredFriends.map((friend, index) =>
                            <FriendsContainer friend={friend} key={index} />
                        )
                    }
                </ScrollView>
            </View>
        </View>
    )
}