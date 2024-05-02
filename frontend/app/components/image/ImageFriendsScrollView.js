import {ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { classNames } from '../../utils';
import ImageFriendBtn from './ImageFriendBtn';

const screenWidth = Dimensions.get('window').width;

export default function ImageFriendsScrollView({ user }) {
    const [scrollEnable, setScrollEnable] = useState(false);

    useEffect(() => {
        setScrollEnable(user.friends.length > 5);
    }, [user.friends.length])

    const FRIEND_CARD_WIDTH = 91
    const contentWidth = Math.max(screenWidth, user.friends.length * FRIEND_CARD_WIDTH)

    return (
        <ScrollView
            className={classNames(
                'mt-4 px-0.5'
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: contentWidth }}
            scrollEnabled={scrollEnable}>
            {
                user.friends.map((friend, index) => <ImageFriendBtn friend={friend} key={index} />)
            }
        </ScrollView >
    )
}