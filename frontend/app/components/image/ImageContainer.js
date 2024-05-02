import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { classNames } from '../../utils'
import ImageCard from './ImageCard'
import ImageCard2 from './ImageCard2'
import ImageFriendsScrollView from './ImageFriendsScrollView'

export default function ImageContainer({ user }) {
    return (
        <View className={classNames(
            'flex-1'
        )}>
            <ImageFriendsScrollView user={user} />
            <ScrollView >
                {
                    user.friends.map( (friend, index) => <ImageCard2 friend={friend} key={index} />)
                }
            </ScrollView>
        </View>
    )
}