import { View, Text, ScrollView } from 'react-native'
import { classNames } from '../utils'
import FriendsContainer from './FriendsContainer'
import React from 'react'

export default function FriendsContent({ friends }) {
    return (
        <View className={classNames(
            'px-4 pt-4 space-y-3',
        )}>
            {/* Friends Counter Text*/}
            <Text className={classNames(
                'text-white font-thin'
            )}>you have {friends.length} friends</Text>

            {/* Friends Container ScrollView*/}
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    friends.map((friend, index) =>
                        <FriendsContainer friend={friend} key={index} />
                    )
                }
            </ScrollView>
        </View>
    )
}