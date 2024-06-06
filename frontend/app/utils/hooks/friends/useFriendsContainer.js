import React, { useEffect, useState } from 'react'
import { fetchRecommendationFriendsData } from '../../database/friendsFetcher';
import { friendLog } from '../../logger/config';

export function useFriendContainer({ friends, searchText, user, selectedTab }) {
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
            const recommendedFriends = await fetchRecommendationFriendsData(user.username, searchText);
            setSearchFriends(recommendedFriends);
        } catch (error) {
            friendLog.error(error)
        }
    };

    useEffect(() => {
        setSearchFriendsVisible(searchText.length >= 4 || filteredFriends.length === 0);

        if (searchText.length !== 0) {
            fetchData();
        }
        else if (searchText.length === 0) {
            setSearchFriends([])
        }
    }, [searchText]);

    return {searchFriendsVisible, searchFriends, filteredFriends, fetchData}
}