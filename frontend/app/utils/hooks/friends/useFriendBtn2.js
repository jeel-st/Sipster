import { acceptFriendInvite, declineFriendInvite } from '../../database/friendsFetcher'
import { useUser } from '../useUser'

export function useFriendBtn2({ friend, handleReloadFriends}) {
    const user = useUser()

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