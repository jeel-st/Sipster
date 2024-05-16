import Friend from "../../entitys/friend"
import axiosInstance from "./axiosConfig"

export async function fetchFriendsData(username) {
    try {
        const response = await axiosInstance.get(`/friends/${username}`);
        console.log("[fetchFriendsData] fetch friends successfully");

        return createFriends(response.data);
    } catch (error) {
        throw error;
    }
}

export async function fetchFriendsInvitations(username) {
    try {
        const response = await axiosInstance.get(`/friends/invitations/${username}`);
        console.log("[fetchFriendsInvitations] fetch friends invitations successfully");

        return response.data
    } catch (error) {
        throw error;
    }
}

export async function fetchRecommendationFriendsData(username, inputText) {
    try {
        const response = await axiosInstance.get(`/friends/${username}/${inputText}`);
        console.log("[fetchRecommendationFriendsData] fetch recommended friends successfully");

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
        console.log("[sendFriendInvite] send Friend Invite successfully");
    } catch (error) {
        throw error;
    }
}

export async function acceptFriendInvite(fromUsername, toUsername) {
    console.log(fromUsername, toUsername)
    try {
        const response = await axiosInstance.delete(`/friends/${fromUsername}/${toUsername}?status=true`);
        console.log("[acceptFriendInvite] accept Friend Invite successfully");

        return true
    } catch (error) {
        throw error;
    }
}

export async function declineFriendInvite(fromUsername, toUsername) {
    try {
        const response = await axiosInstance.delete(`/friends/${fromUsername}/${toUsername}?status=false`);
        console.log("[declineFriendInvite] decline Friend Invite successfully");

        return false
    } catch (error) {
        throw error;
    }
}

export async function removeFriend(username, friendUsername) {
    try {
        const response = await axiosInstance.delete(`/friends/${username}/${friendUsername}?remove=true`);
        console.log("[removeFriend] remove Friend successfully");
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