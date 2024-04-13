import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { classNames } from '../../utils'
import FriendsContainer from './FriendsContainer'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function FriendsContent({ friends, searchText }) {
    if (!friends) return (<View>
        <Text>Loading...</Text>
    </View>)

    const [searchFriendsVisible, setSearchFriendsVisible] = useState(false);

    const filteredFriends = friends.filter(friend => {
        return (
            friend.firstName.toLowerCase().startsWith(searchText.toLowerCase()) ||
            friend.username.toLowerCase().startsWith(searchText.toLowerCase())
        )
    });

    useEffect(() => {
        if (searchText.length >= 4 || filteredFriends.length == 0) {
            setSearchFriendsVisible(true)
        } else {
            setSearchFriendsVisible(false)
        }
    }, [searchText])

    return (
        <View className={classNames(
            'px-4 pt-4 space-y-3',
        )}>
            {/* Friends Counter Text*/}
            {
                <Text className={classNames('text-white font-thin')}>
                    {searchFriendsVisible ? `Found ${filteredFriends.length} friends` : `You have ${filteredFriends.length} friends`}
                </Text>
            }

            {/* Friends Invite Button*/}
            {
                searchFriendsVisible && (
                    <TouchableOpacity
                        className={classNames(
                            'flex-row items-center justify-between',
                            'px-4',
                            'h-16',
                            'rounded-xl bg-secondary border-[0.5px] border-slate-200',
                        )}>
                        <Text className={classNames('text-white font-semibold text-xl')}> Invite Friends to Sipster {':)'}</Text>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>
                )
            }

            {/* Friends Container ScrollView*/}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Added Friends*/}
                {
                    filteredFriends.map((friend, index) =>
                        <FriendsContainer friend={friend} key={index} />
                    )
                }
                {/* Search Friends*/}
                {
                    searchFriendsVisible && (filteredFriends.map((friend, index) =>
                        <FriendsContainer friend={friend} key={index} />
                    ))
                }
            </ScrollView>

        </View>
    )
}