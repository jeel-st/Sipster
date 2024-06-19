import Friend from "../../entitys/friend"
import { friendLog } from "../logger/config";
import axiosInstance from "./axiosConfig"

export async function fetchFriends(user) {
    try {
        const reponse = await axiosInstance.get(`/friends/${user._id}`);
        friendLog.info("Friends has been fetched successfully.")

        return reponse.data
    } catch (error) {
        friendLog.error("Friends could not been fetched.", error)
        throw error;
    }
}

export async function fetchFriendsData(user) {
    try {
        const response = await axiosInstance.get(`/friends/${user._id}`);
        friendLog.debug("Friends have been loaded successfully.")

        return createFriends(response.data);
    } catch (error) {
        throw error;
    }
}

export async function fetchFriendsInvitations(user) {
    try {
        const response = await axiosInstance.get(`/friends/invitations/${user._id}`);
        friendLog.debug("Friends invitations have been loaded successfully.")

        return response.data
    } catch (error) {
        throw error;
    }
}

export async function fetchRecommendationFriendsData(user, inputText) {
    try {
        const response = await axiosInstance.get(`/friends/${user._id}/${inputText}`);
        friendLog.debug("Recommendation Friends have been loaded successfully.")

        return createFriends(response.data);
    } catch (error) {
        throw error;
    }
}

export async function sendFriendInvite(user, friend) {
    try {
        const response = await axiosInstance.post('/friends',
            {
                "fromUserID": user._id,
                "toUserID": friend._id
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        friendLog.debug("Friend invite has been sent successfully.")
    } catch (error) {
        throw error;
    }
}

export async function acceptFriendInvite(fromUser, toUser) {
    try {
        const response = await axiosInstance.delete(`/friends/${fromUser._id}/${toUser._id}?status=true`);
        friendLog.debug("Friend invite has been accepted successfully.")

        return true
    } catch (error) {
        throw error;
    }
}

export async function declineFriendInvite(fromUser, toUser) {
    try {
        const response = await axiosInstance.delete(`/friends/${fromUser._id}/${toUser._id}?status=false`);
        friendLog.debug("Friend invite has been declined successfully.")

        return false
    } catch (error) {
        throw error;
    }
}

export async function removeFriend(user, friend) {
    try {
        const response = await axiosInstance.delete(`/friends/${user._id}/${friend._id}?remove=true`);
        friendLog.debug("Friend has been removed successfully.")
    } catch (error) {
        throw error;
    }
}

function createFriends(friendsData) {
    //friendsData = friendMultiplier(friendsData)

    if (friendsData.length > 0) {
        return friendsData.map(friend => new Friend(friend));
    } else {
        return [];
    }
}

function friendMultiplier(friendsData) {
    return friendsData.concat(friendsData, friendsData)
}