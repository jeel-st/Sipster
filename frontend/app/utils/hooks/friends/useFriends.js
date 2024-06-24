import { useEffect, useState } from 'react';
import { fetchFriendsInvitations, fetchRecommendationFriendsData } from '../../database/friendsFetcher';
import { useUser } from '../useUser';
import UserManager from '../../../entitys/UserManager';
import { friendLog } from '../../logger/config';
import { usePathname } from 'expo-router';

/*
    Custom hook to handle friends

    @return: object -> the object containing the friends data
*/
export function useFriends() {
    const [searchText, setSearchText] = useState('')
    const [selectedTab, setSelectedTab] = useState(0)
    const [viewFriends, setViewFriends] = useState(null)
    const [viewCategorys, setViewCategorys] = useState(true)
    const [searchFriends, setSearchFriends] = useState([]);
    const [searchFriendsVisible, setSearchFriendsVisible] = useState(false);
    const path = usePathname()

    user = useUser()

    /*
        Method to update the view friends

        @return: void
    */
    const filteredFriends = viewFriends?.filter(friend => {
        return (
            friend.firstName.toLowerCase().startsWith(searchText.toLowerCase()) ||
            friend.username.toLowerCase().startsWith(searchText.toLowerCase())
        );
    }) || [];

    /*
        Method to fetch the friends and friend invitation based on the selected tab

        @return: void
    */
    const updateViewFriends = async () => {
        let friends = user.friends
        // Check if the selected tab is not 0
        if (selectedTab !== 0) {
            // If the selected tab is not 0, fetch the friend invitations based on the selected tab
            const invitations = await fetchFriendsInvitations(user);
            friends = invitations[selectedTab - 1] || []
        } else {
            // If the selected tab is 0, fetch the user friends to see if there are new friends
            const userManager = UserManager.getInstance()
            friends = await userManager.updateFriends(user)
        }
        setViewFriends(friends)
    }

    /*
        Method to handle the search text change

        @param text: string -> the text to search for
        @return: void
    */
    const handleSearchTextChange = (text) => {
        setSearchText(text)

        // Check if the search text is empty to
        if (text.trim() === "") {
            // If search text is empty, show the categorys and replace the recommended friends with the user friends
            setViewCategorys(true)
            setViewFriends(user.friends)
        }
        else {
            // If search text is not empty, switch to tab 0 and hide the categorys
            setViewCategorys(false)
            setSelectedTab(0)
        }
    }

    /*
        Method to handle the tab change

        @param tabIndex: number -> the index of the tab
        @return: void
    */
    const handleTabChange = async (tabIndex) => {
        setSelectedTab(tabIndex)
    }

    /*
        Method to handle the reload friends

        @return: void
    */
    const handleReloadFriends = async () => {
        await updateViewFriends();
    }

    /*
        UseEffect to update the view friends when the tab changed

        @return: void
    */
    useEffect(() => {
        if (user) {
            updateViewFriends();
        }
    }, [user, selectedTab, path])

    /*
        UseEffect to fetch the recommended friends based on the search text

        @return: void
    */
    useEffect(() => {
        // Fetch the recommended friends based on the search text
        async function fetchData() {
            try {
                const recommendedFriends = await fetchRecommendationFriendsData(user, searchText);
                setSearchFriends(recommendedFriends);
            } catch (error) {
                friendLog.error(error)
            }
        }

        setSearchFriendsVisible(searchText.length >= 4 || filteredFriends.length === 0);

        // Fetch data if nothing is typed in the search bar so the recommended friends are not shown
        if (searchText.length !== 0) {
            fetchData();
        }
        else if (searchText.length === 0) {
            setSearchFriends([])
        }
    }, [searchText, filteredFriends.length]);

    // Return all necessary states and handlers
    return { searchText, selectedTab, viewFriends, viewCategorys, searchFriendsVisible, searchFriends, filteredFriends, handleSearchTextChange, handleTabChange, handleReloadFriends }
}