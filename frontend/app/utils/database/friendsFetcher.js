// Imports
import Friend from "../../entitys/friend"
import { friendLog } from "../logger/config";
import axiosInstance from "./axiosConfig"

/*
    Method to fetch friends

    @param user: object -> the user to fetch the friends
    @return: array -> the friends of the user
*/
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

/*
    Method to fetch friends data

    @param user: object -> the user to fetch the friends data
    @return: array -> the friends data of the user
*/
export async function fetchFriendsData(user) {
    try {
        const response = await axiosInstance.get(`/friends/${user._id}`);
        friendLog.debug("Friends have been loaded successfully.")

        return createFriends(response.data);
    } catch (error) {
        throw error;
    }
}

/*
    Method to fetch friends invitations

    @param user: object -> the user to fetch the friends invitations
    @return: array -> the friends invitations of the user
*/
export async function fetchFriendsInvitations(user) {
    try {
        const response = await axiosInstance.get(`/friends/invitations/${user._id}`);
        friendLog.debug("Friends invitations have been loaded successfully.")

        return response.data
    } catch (error) {
        throw error;
    }
}

/*
    Method to fetch recommendation friends data

    @param user: object -> the user to fetch the friends recommendation data
    @return: array -> the friends recommendation data of the user
*/
export async function fetchRecommendationFriendsData(user, inputText) {
    try {
        const response = await axiosInstance.get(`/friends/${user._id}/${inputText}`);
        friendLog.debug("Recommendation Friends have been loaded successfully.")

        return createFriends(response.data);
    } catch (error) {
        throw error;
    }
}

/*
    Method to send a friend invite

    @param user: object -> the user to send the friend invite
    @param friend: object -> the friend to invite
*/
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

/*
    Method to accept a friend invite

    @param fromUser: object -> the user who sent the friend invite
    @param toUser: object -> the user who received the friend invite
*/
export async function acceptFriendInvite(fromUser, toUser) {
    try {
        const response = await axiosInstance.put(`/friends/accept/${fromUser._id}/${toUser._id}`);
        friendLog.debug("Friend invite has been accepted successfully.")

        return true
    } catch (error) {
        throw error;
    }
}

/*
    Method to decline a friend invite

    @param fromUser: object -> the user who sent the friend invite
    @param toUser: object -> the user who received the friend invite
*/
export async function declineFriendInvite(fromUser, toUser) {
    try {
        const response = await axiosInstance.delete(`/friends/delete/${fromUser._id}/${toUser._id}?remove=false`);
        friendLog.debug("Friend invite has been declined successfully.")

        return false
    } catch (error) {
        throw error;
    }
}

/*
    Method to remove a friend

    @param user: object -> the user to remove the friend
    @param friend: object -> the friend to remove
*/
export async function removeFriend(user, friend) {
    try {
        const response = await axiosInstance.delete(`/friends/delete/${user._id}/${friend._id}?remove=true`);
        friendLog.debug("Friend has been removed successfully.")
    } catch (error) {
        throw error;
    }
}

/*
    Method to create friends

    @param friendsData: array -> the friends data
    @return: array -> the friends
*/
function createFriends(friendsData) {
    // Check if the friendsData is not empty and create the friends array with the friendsData
    if (friendsData.length > 0) {
        return friendsData.map(friend => new Friend(friend));
    } else {
        return [];
    }
}