import { View, Text, ScrollView } from 'react-native'
import { friends } from '../constants/friends'
import React from 'react'
import FriendCard from './FriendCard'

export default function Friends() {
    return (
        <ScrollView className="mt-4" horizontal showsHorizontalScrollIndicator={false}>
            {
                friends.map((friend, index) => <FriendCard friend={friend} key={index} />)
            }
        </ScrollView>
    )
}