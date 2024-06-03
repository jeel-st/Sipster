import { acceptFriendInvite, declineFriendInvite } from '../../database/friendsFetcher'

export function useFriendBtn2({ friend, user, handleReloadFriends}) {
    const handleAcceptInvite = async () => {
        await acceptFriendInvite(friend.username, user.username)
        handleReloadFriends()
    }

    const handleDeclineInvite = async () => {
        await declineFriendInvite(friend.username, user.username)
        handleReloadFriends()
    }

    const handleCancelInvite = async () => {
        await declineFriendInvite(user.username, friend.username)
        handleReloadFriends()
    }
    return { handleAcceptInvite, handleDeclineInvite, handleCancelInvite }
}