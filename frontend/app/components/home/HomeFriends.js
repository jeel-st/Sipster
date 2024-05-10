import {ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { classNames } from '../../utils';
import HomeFriendBtn from './HomeFriendBtn';

// Getting the width of the screen
const screenWidth = Dimensions.get('window').width;

export default function HomeFriends({ user, displayFriend, handleFriendSelection }) {
    const [scrollEnable, setScrollEnable] = useState(false);

    // useEffect to update scrollEnable based on the number of friends
    useEffect(() => {
        setScrollEnable(user.friends.length > 5);
    }, [user.friends.length])

    // Constants for calculating content width
    const FRIEND_CARD_WIDTH = 91
    const contentWidth = Math.max(screenWidth, user.friends.length * FRIEND_CARD_WIDTH)

    return (
        <ScrollView
            className={classNames(
                'mt-4 px-2'
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: contentWidth }}
            scrollEnabled={scrollEnable}>
            {
                user.friends.map((friend, index) => <HomeFriendBtn friend={friend} displayFriend={displayFriend} handleFriendSelection={handleFriendSelection} friendId={index} key={index} />)
            }
        </ScrollView >
    )
}