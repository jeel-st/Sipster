import { ScrollView } from 'react-native'
import { friends } from '../../constants'
import FriendCard from './FriendCard'
import React from 'react'

export default function Friends() {
    return (
        <ScrollView className="mt-4" horizontal showsHorizontalScrollIndicator={false}>
            {
                friends.map((friend, index) => <FriendCard friend={friend} key={index} />)
            }
        </ScrollView>
    )
}