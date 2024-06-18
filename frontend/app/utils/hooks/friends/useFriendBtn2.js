import UserManager from '../../../entitys/UserManager'
import { acceptFriendInvite, declineFriendInvite } from '../../database/friendsFetcher'
import { useUser } from '../useUser'

export function useFriendBtn2({ friend, handleReloadFriends}) {
    const user = useUser()
    const userManager = UserManager.getInstance()

    const handleAcceptInvite = async () => {
        await acceptFriendInvite(friend.username, user.username)
        userManager.updateFriends(user.username)

        handleReloadFriends()
    }

    const handleDeclineInvite = async () => {
        await declineFriendInvite(friend.username, user.username)
        userManager.updateFriends(user.username)

        handleReloadFriends()
    }

    const handleCancelInvite = async () => {
        await declineFriendInvite(user.username, friend.username)
        userManager.updateFriends(user.username)

        handleReloadFriends()
    }
    return { handleAcceptInvite, handleDeclineInvite, handleCancelInvite }
}