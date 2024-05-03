import { View, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils';
import ImageCard2 from './ImageCard2';
import ImageFriendsScrollView from './ImageFriendsScrollView';

export default function ImageContainer({ user, displayFriend, handleFriendSelection }) {
    const scrollViewRef = useRef(null)
    const [isManualScroll, setIsManualScroll] = useState(false)
    const windowWidth = Dimensions.get('window').width

    useEffect(() => {
        if (!user) return;

        const friendIndex = displayFriend
        const scrollOffset = friendIndex * windowWidth
        setIsManualScroll(true)
        scrollViewRef.current.scrollTo({ x: scrollOffset, animated: true })

        const timer = setTimeout(() => {
            setIsManualScroll(false)
        }, 300);

        return () => clearTimeout(timer);
    }, [displayFriend])

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x
        const friendIndex = Math.round(offsetX / windowWidth)
        if (!isManualScroll && friendIndex !== displayFriend) {
            handleFriendSelection(friendIndex)
        }
    };

    return (
        <View className={classNames(
            'flex-1'
        )}>
            <ImageFriendsScrollView user={user} displayFriend={displayFriend} handleFriendSelection={handleFriendSelection} />
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ width: user.friends.length * windowWidth }}
                onScroll={handleScroll}>
                {
                    user.friends.map((friend, index) => <View key={index} style={{ width: windowWidth }}><ImageCard2 friend={friend} /></View>)
                }
            </ScrollView>
        </View>
    )
}
