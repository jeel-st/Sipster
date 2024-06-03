import { useState, useEffect } from 'react';
import { fetchFriendsInvitations, removeFriend, sendFriendInvite, declineFriendInvite } from '../database/friendsFetcher';
import useUser from '../database/userFetcher';
import { useDisclose } from 'native-base';

const useProfileHeaderButton = (friend) => {
    const [isFriend, setIsFriend] = useState(false);
    const [isInvited, setIsInvited] = useState(false);

    const { isOpen, onToggle } = useDisclose();

    const user = useUser();

    const handleIsFriend = async () => {
        const isFriend = user.friends.some(element => element.username === friend.username);
        const invites = await fetchFriendsInvitations(user.username);
        const inviteReceived = invites[0].some(element => element.username === friend.username);
        const sentReceived = invites[1].some(element => element.username === friend.username);

        setIsFriend(isFriend);
        setIsInvited(isFriend ? false : (inviteReceived || sentReceived));
    };


    useEffect(() => {
        if (user) handleIsFriend()
    }, [user]);

    const removeFriendHandler = async () => {
        try {
            await removeFriend(user.username, friend.username);
            await handleIsFriend();

            setIsFriend(false)
            user.friends.filter(item => item.username !== friend.username);
        } catch (error) {
            console.log("[useFriendStatus.removeFriendHandler] ", error);
        }
    };

    const inviteFriendHandler = async () => {
        try {
            await sendFriendInvite(user.username, friend.username);
            await handleIsFriend();
        } catch (error) {
            console.log("[useFriendStatus.inviteFriendHandler] ", error);
        }
    };

    const closeInviteHandler = async () => {
        try {
            await declineFriendInvite(user.username, friend.username);
            await handleIsFriend();
        } catch (error) {
            console.log("[useFriendStatus.closeInviteHandler] ", error);
        }
    };

    return { isFriend, isInvited, removeFriendHandler, inviteFriendHandler, closeInviteHandler, isOpen, onToggle };
};

export default useProfileHeaderButton;
