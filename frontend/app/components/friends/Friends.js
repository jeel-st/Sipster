import {ScrollView, Dimensions } from 'react-native'
import FriendCard from './FriendCard'
import React, { useEffect, useState } from 'react'
import FriendsSkeleton from '../skeletons/FriendsSkeleton';

const screenWidth = Dimensions.get('window').width;

export default function Friends({ friends }) {
    const [scrollEnable, setScrollEnable] = useState(false);

    useEffect(() => {
        if (friends.length > 5) setScrollEnable(true)
        else setScrollEnable(false)
    }, friends)

    const FRIEND_CARD_WIDTH = 91
    const contentWidth = Math.max(screenWidth, friends.length * FRIEND_CARD_WIDTH)

    if (friends.length == 0) {
        return FriendsSkeleton()
    }

    return (
        <ScrollView
            className="mt-4 px-6"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: contentWidth }}
            scrollEnabled={scrollEnable}>
            {
                friends.map((friend, index) => <FriendCard friend={friend} key={index} />)
            }
        </ScrollView >
    )
}