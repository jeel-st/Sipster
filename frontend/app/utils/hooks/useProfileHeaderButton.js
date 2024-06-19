import { useState, useEffect } from 'react';
import { fetchFriendsInvitations, removeFriend, sendFriendInvite, declineFriendInvite } from '../database/friendsFetcher';
import { useDisclose } from 'native-base';
import { friendLog } from '../logger/config';
import { useUser } from './useUser';

const useProfileHeaderButton = (friend) => {
    const [isFriend, setIsFriend] = useState(false);
    const [isInvited, setIsInvited] = useState(false);

    const { isOpen, onToggle } = useDisclose();

    const user = useUser();

    const handleIsFriend = async () => {
        const isFriend = user.friends.some(element => element.username === friend.username);
        const invites = await fetchFriendsInvitations(user);
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
            await removeFriend(user, friend);
            await handleIsFriend();

            setIsFriend(false)
            user.friends.filter(item => item.username !== friend.username);
        } catch (error) {
            friendLog.error("Remove friendrequest failed", error)
        }
    };

    const inviteFriendHandler = async () => {
        try {
            await sendFriendInvite(user, friend);
            await handleIsFriend();
        } catch (error) {
            friendLog.error("Send friendrequest failed", error)
        }
    };

    const closeInviteHandler = async () => {
        try {
            await declineFriendInvite(user, friend);
            await handleIsFriend();
        } catch (error) {
            friendLog.error("Decline friendrequest failed", error)
        }
    };

    return { isFriend, isInvited, removeFriendHandler, inviteFriendHandler, closeInviteHandler, isOpen, onToggle };
};

export default useProfileHeaderButton;
