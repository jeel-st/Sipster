

async function checkForFriendsInRecommendations(friendRecommendations, username) {
    let sortedFriendRecommendations = [];
    try {
        for (let friend of friendRecommendations) {
            if (friend.username != username) {
                let isFriend = false;
                if (friend.friends && friend.friends.length > 0) {
                    for (let friendUsername of friend.friends) {
                        if (friendUsername === username) {
                            isFriend = true;
                            break;
                        }
                    }
                }
                if (!isFriend) {
                    sortedFriendRecommendations.push(friend);
                }
            }
        }
    } catch (error) {
        console.error("Error in checkForFriendsInRecommendations(): ", error);
    }
    return sortedFriendRecommendations;
}

module.exports = { checkForFriendsInRecommendations }