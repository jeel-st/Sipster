import { useEffect, useState } from 'react';
import { fetchFriendsData, fetchFriendsInvitations } from '../../database/friendsFetcher';
import { useUser } from '../useUser';
import UserManager from '../../../entitys/UserManager';

export function useFriends() {
    const [searchText, setSearchText] = useState('')
    const [selectedTab, setSelectedTab] = useState(0)
    const [viewFriends, setViewFriends] = useState(null)
    const [viewCategorys, setViewCategorys] = useState(true)

    user = useUser()

    const handleSearchTextChange = (text) => {
        setSearchText(text)

        if (text.trim() === "") {
            setViewCategorys(true)
            setViewFriends(user.friends)
        }
        else {
            setViewCategorys(false)
            setSelectedTab(0)
        }
    }

    const handleTabChange = async (tabIndex) => {
        setSelectedTab(tabIndex)
    }

    const handleReloadFriends = async () => {
        await updateViewFriends();
    }

    const updateViewFriends = async () => {
        let friends = user.friends
        if (selectedTab !== 0) {
            const invitations = await fetchFriendsInvitations(user.username);
            friends = invitations[selectedTab - 1] || []
        } else {
            const userManager = UserManager.getInstance()
            friends = await userManager.updateFriends(user.username)
        }
        setViewFriends(friends)
    }

    useEffect(() => {
        if (user) {
            updateViewFriends();
        }
    }, [user, selectedTab])

    return { searchText, selectedTab, viewFriends, viewCategorys, handleSearchTextChange, handleTabChange, handleReloadFriends }
}