import { View, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils';
import ImageCard2 from './ImageCard2';
import ImageFriendsScrollView from './ImageFriendsScrollView';

// Component to display user's images and scroll through friends
export default function ImageContainer({ user, displayFriend, handleFriendSelection, handleScroll, scrollToFriend }) {
    const scrollViewRef = useRef(null)
    const windowWidth = Dimensions.get('window').width

    // useEffect to scroll to the selected friend when displayFriend changes
    useEffect(() => {
        scrollToFriend(scrollViewRef, windowWidth)
    }, [displayFriend])

    return (
        <View className={classNames(
            'flex-1'
        )}>
            {/* Friend controller tab bar */}
            <ImageFriendsScrollView
                user={user}
                displayFriend={displayFriend}
                handleFriendSelection={handleFriendSelection} />

            {/* ScrollView to display friend's images */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ width: user.friends.length * windowWidth }}
                onScroll={handleScroll(scrollViewRef, windowWidth)}>
                {
                    user.friends.map((friend, index) => <View key={index} style={{ width: windowWidth }}><ImageCard2 friend={friend} /></View>)
                }
            </ScrollView>
        </View>
    )
}
