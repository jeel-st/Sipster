import { View, Text, ScrollView } from 'react-native'
import FriendCard from './FriendCard'
import React from 'react'
import User from '../../entitys/user'

export default function Friends({friends}) {
    if (!friends) {
        return <View><Text>No friends to display</Text></View>
    }

    return (
        <ScrollView className="mt-4" horizontal showsHorizontalScrollIndicator={false}>
            {
                friends.map((friend, index) => <FriendCard friend={friend} key={index} />)
            }
        </ScrollView>
    )
}