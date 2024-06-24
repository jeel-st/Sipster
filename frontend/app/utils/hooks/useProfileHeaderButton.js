// Imports
import { useState, useEffect } from 'react';
import { fetchFriendsInvitations, removeFriend, sendFriendInvite, declineFriendInvite } from '../database/friendsFetcher';
import { useDisclose } from 'native-base';
import { friendLog } from '../logger/config';
import { useUser } from './useUser';
import UserManager from '../../entitys/UserManager';

/*
    Custom hook to handle the profile header button

    @param friend: object -> the friend to handle
    @return: object -> the object containing the hook methods
*/
const useProfileHeaderButton = (friend) => {
    const [isFriend, setIsFriend] = useState(false);
    const [isInvited, setIsInvited] = useState(false);

    const { isOpen, onToggle } = useDisclose();

    const user = useUser();
    const userManager = UserManager.getInstance()

    /*
        Method to handle the friend status

        @return: void
    */
    const handleIsFriend = async () => {
        // Check if the friend is already a friend
        const isFriend = user.friends.some(element => element.username === friend.username);

        // Fetch the friend invitations to check if the friend is invited or has invited the user
        const invites = await fetchFriendsInvitations(user);
        const inviteReceived = invites[0].some(element => element.username === friend.username);
        const sentReceived = invites[1].some(element => element.username === friend.username);

        // Set Status based on if the user is already a friend or has received or sent an invite
        setIsFriend(isFriend);
        setIsInvited(isFriend ? false : (inviteReceived || sentReceived));
    };

    /*
        Method to remove a friend

        @return: void
    */
    const removeFriendHandler = async () => {
        try {
            await removeFriend(user, friend);
            await handleIsFriend();

            setIsFriend(false)
            userManager.updateFriends(user);
        } catch (error) {
            friendLog.error("Remove friendrequest failed", error)
        }
    };

    /*
        Method to invite a friend

        @return: void
    */
    const inviteFriendHandler = async () => {
        try {
            await sendFriendInvite(user, friend);
            await handleIsFriend();
        } catch (error) {
            friendLog.error("Send friendrequest failed", error)
        }
    };

    /*
        Method to decline the friend invite

        @return: void
    */
    const closeInviteHandler = async () => {
        try {
            await declineFriendInvite(user, friend);
            await handleIsFriend();
        } catch (error) {
            friendLog.error("Decline friendrequest failed", error)
        }
    };

    /*
        UseEffect to handle the friend status when user changes or site loads

        @return: void
    */
    useEffect(() => {
        if (user) handleIsFriend()
    }, [user]);

    return { isFriend, isInvited, removeFriendHandler, inviteFriendHandler, closeInviteHandler, isOpen, onToggle };
};

export default useProfileHeaderButton;
