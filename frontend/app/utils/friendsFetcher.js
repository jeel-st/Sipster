import axios from "axios"
import Friend from "../entitys/friend"

export async function fetchFriendsData(username) {
    try {
        const response = await axios.get(`http://85.215.71.124/friends/${username}`)
        console.log("[fetchFriendsData] fetch friends successfully")

        const friends = await createFriends(response.data)
        return friends
    } catch (error) {
        console.log(error)
        throw error
    }
}

function createFriends(friendsData) {
    friendsData = friendMultiplier(friendsData)

    let friends = []
    if(friendsData != []){
        friends= friendsData.map(friend => new Friend(friend.firstName, friend.lastName, friend.registerDate, friend.username))
    }

    return friends
}

function friendMultiplier(friendsData){
    return friendsData.concat(friendsData, friendsData)
}