async function checkForFriendsInRecommendations(friendReccommendations, username){
    let sortedFriendRecommendations = []
    for (let friend in friendReccommendations) {
        if (!friend.friends.includes(username)){
            sortedFriendRecommendations.push(friend)
        }
    }
    return sortedFriendRecommendations
}

module.exports = checkForFriendsInRecommendations;