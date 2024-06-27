import UserManager from '../../../entitys/UserManager'
import { acceptFriendInvite, declineFriendInvite } from '../../database/friendsFetcher'
import { useUser } from '../useUser'

/*
    Custom hook to handle friend buttons

    @param friend: Friend -> the friend to handle
    @param handleReloadFriends: function -> function to reload the friends
    @return: object -> the object containing the methods to handle the friend buttons
*/
export function useFriendBtn2({ friend, handleReloadFriends}) {
    const user = useUser()
    // Get the singleton instance of UserManager
    const userManager = UserManager.getInstance()

    /*
        Method to handle the accept friend invite button

        @return: void
    */
    const handleAcceptInvite = async () => {
        await acceptFriendInvite(friend, user)
        userManager.updateFriends(user)

        handleReloadFriends()
    }

    /*
        Method to handle the decline friend invite button

        @return: void
    */
    const handleDeclineInvite = async () => {
        await declineFriendInvite(friend, user)
        userManager.updateFriends(user)

        handleReloadFriends()
    }

    /*
        Method to handle the cancel friend invite button

        @return: void
    */
    const handleCancelInvite = async () => {
        await declineFriendInvite(user, friend)
        userManager.updateFriends(user)

        handleReloadFriends()
    }
    return { handleAcceptInvite, handleDeclineInvite, handleCancelInvite }
}