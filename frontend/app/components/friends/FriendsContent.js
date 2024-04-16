import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { classNames } from '../../utils'
import FriendsContainer from './FriendsContainer'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { NativeBaseProvider } from "native-base";
import FriendsH2Skeleton from '../skeletons/FriendsH2Skeleton';
import { fetchFriendsData, fetchRecommendationFriendsData } from '../../utils/friendsFetcher';

export default function FriendsContent({ friends, searchText, user }) {

    if (!friends) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const [searchFriendsVisible, setSearchFriendsVisible] = useState(false);
    const [searchFriends, setSearchFriends] = useState([]);

    const filteredFriends = friends.filter(friend => {
        return (
            friend.firstName.toLowerCase().startsWith(searchText.toLowerCase()) ||
            friend.username.toLowerCase().startsWith(searchText.toLowerCase())
        );
    });

    const fetchData = async () => {
        try {
            const recommendedFriends = await fetchRecommendationFriendsData(user.username , searchText);
            setSearchFriends(recommendedFriends);
        } catch (error) {
            console.log("[FriendsContent.recommendedFriends] Error", error);
        }
    };

    useEffect(() => {
        setSearchFriendsVisible(searchText.length >= 4 || filteredFriends.length === 0);

        if (searchText.length !== 0) {
            fetchData();
        }
        else if (searchText.length === 0){
            setSearchFriends([])
        }
    }, [searchText]);

    const renderFriendContainers = (friends) => {
        return friends.map((friend, index) => (
            <FriendsContainer friend={friend} key={index} />
        ));
    };

    const renderFriendsText = () => {
        if (searchFriendsVisible) {
            return `Found ${searchFriends.length} recommendations`;
        } else {
            return `You have ${filteredFriends.length} friends`;
        }
    };

    const renderInviteButton = () => {
        if (searchFriendsVisible) {
            return (
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
            );
        }
        return null;
    };

    return (
        <NativeBaseProvider isSSR={true}>
            <View className={classNames('px-4 pt-4 space-y-3')}>
                <Text className={classNames('text-white font-thin')}>
                    {renderFriendsText()}
                </Text>

                {renderInviteButton()}

                <ScrollView showsVerticalScrollIndicator={false}>
                    {(filteredFriends.length === 0 && searchFriends.length === 0) && FriendsH2Skeleton()}
                    {renderFriendContainers(filteredFriends)}
                    {searchFriendsVisible && renderFriendContainers(searchFriends)}
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
}