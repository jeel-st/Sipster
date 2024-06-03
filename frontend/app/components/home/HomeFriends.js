import { ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { classNames } from '../../utils';
import HomeFriendBtn from './HomeFriendBtn';

/*
    HomeFriends is a component that represents the list of friends as a tablist.
    It displays a list of friends in a horizontal scroll view.
    Typ: Component from home

    @param user: object -> the user
    @param displayFriend: function -> the function to display the friend
    @param handleFriendSelection: function -> the function to handle the selection of a friend
    @return: JSX -> returns the HomeFriends component
*/
export default function HomeFriends({ user, displayFriend, handleFriendSelection }) {
    const [scrollEnable, setScrollEnable] = useState(false);

    // Getting the width of the screen
    const screenWidth = Dimensions.get('window').width;

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
                user.friends.map((friend, index) =>
                    <HomeFriendBtn
                        friend={friend}
                        displayFriend={displayFriend}
                        handleFriendSelection={handleFriendSelection}
                        friendId={index}
                        key={index}
                    />
                )
            }
        </ScrollView >
    )
}