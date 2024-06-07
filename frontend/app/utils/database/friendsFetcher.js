import Friend from "../../entitys/friend"
import { friendLog } from "../logger/config";
import axiosInstance from "./axiosConfig"

export async function fetchFriendsData(username) {
    try {
        const response = await axiosInstance.get(`/friends/${username}`);
        friendLog.debug("Friends have been loaded successfully.")

        return createFriends(response.data);
    } catch (error) {
        throw error;
    }
}

export async function fetchFriendsInvitations(username) {
    try {
        const response = await axiosInstance.get(`/friends/invitations/${username}`);
        friendLog.debug("Friends invitations have been loaded successfully.")

        return response.data
    } catch (error) {
        throw error;
    }
}

export async function fetchRecommendationFriendsData(username, inputText) {
    try {
        const response = await axiosInstance.get(`/friends/${username}/${inputText}`);
        friendLog.debug("Recommendation Friends have been loaded successfully.")

        return createFriends(response.data);
    } catch (error) {
        throw error;
    }
}

export async function sendFriendInvite(username, friendUsername) {
    try {
        const response = await axiosInstance.post('/friends',
            {
                "fromSipsterID": username,
                "toSipsterID": friendUsername
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

export async function acceptFriendInvite(fromUsername, toUsername) {
    try {
        const response = await axiosInstance.delete(`/friends/${fromUsername}/${toUsername}?status=true`);
        friendLog.debug("Friend invite has been accepted successfully.")

        return true
    } catch (error) {
        throw error;
    }
}

export async function declineFriendInvite(fromUsername, toUsername) {
    try {
        const response = await axiosInstance.delete(`/friends/${fromUsername}/${toUsername}?status=false`);
        friendLog.debug("Friend invite has been declined successfully.")

        return false
    } catch (error) {
        throw error;
    }
}

export async function removeFriend(username, friendUsername) {
    try {
        const response = await axiosInstance.delete(`/friends/${username}/${friendUsername}?remove=true`);
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