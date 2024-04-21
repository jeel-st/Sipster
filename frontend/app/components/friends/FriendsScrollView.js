import {ScrollView, Dimensions } from 'react-native'
import FriendCard from './FriendBtn'
import React, { useEffect, useState } from 'react'

const screenWidth = Dimensions.get('window').width;

export default function FriendsScrollView({ friends, user }) {
    const [scrollEnable, setScrollEnable] = useState(false);

    useEffect(() => {
        if (friends.length > 5) setScrollEnable(true)
        else setScrollEnable(false)
    }, friends)

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
                friends.map((friend, index) => <FriendCard friend={friend} key={index} user={user}/>)
            }
        </ScrollView >
    )
}