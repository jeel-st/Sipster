import UserManager from '../../../entitys/UserManager'
import { acceptFriendInvite, declineFriendInvite } from '../../database/friendsFetcher'
import { useUser } from '../useUser'

export function useFriendBtn2({ friend, handleReloadFriends}) {
    const user = useUser()
    const userManager = UserManager.getInstance()

    const handleAcceptInvite = async () => {
        await acceptFriendInvite(friend, user)
        userManager.updateFriends(user)

        handleReloadFriends()
    }

    const handleDeclineInvite = async () => {
        await declineFriendInvite(friend, user)
        userManager.updateFriends(user)

        handleReloadFriends()
    }

    const handleCancelInvite = async () => {
        await declineFriendInvite(user, friend)
        userManager.updateFriends(user)

        handleReloadFriends()
    }
    return { handleAcceptInvite, handleDeclineInvite, handleCancelInvite }
}