import { ScrollView, Dimensions } from 'react-native'
import FriendCard from './FriendBtn'
import React, { useEffect, useState } from 'react'

/*
    FriendsScrollView is a component that represents the list of friends.
    It displays a list of friends in a horizontal scroll view.
    Typ: Component from friends

    @param friends:  array -> the list of friends to display
    @param user:     object -> the user
    @return:         JSX -> returns the FriendsScrollView component
*/
export default function FriendsScrollView({ friends, user }) {
    const [scrollEnable, setScrollEnable] = useState(false);

    useEffect(() => {
        setScrollEnable(friends.length > 5);
    }, [friends.length])

    const screenWidth = Dimensions.get('window').width;
    const FRIEND_CARD_WIDTH = 91
    const contentWidth = Math.max(screenWidth, friends.length * FRIEND_CARD_WIDTH)

    return (
        <ScrollView
            className="mt-4 px-6"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: contentWidth }}
            scrollEnabled={scrollEnable}>
            {
                friends.map((friend, index) =>
                    <FriendCard
                        friend={friend}
                        key={index}
                        user={user}
                    />
                )
            }
        </ScrollView >
    )
}