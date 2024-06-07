/**
 * Überprüft eine Liste von Freundschaftsempfehlungen und entfernt diejenigen, die bereits Freunde des angegebenen Benutzers sind.
 * 
 * @param friendRecommendations Objekt- Array  -> Die Liste der Freundschaftsempfehlungen.
 * @param username String -> Der Benutzername des Benutzers, für den die Empfehlungen geprüft werden.
 * @returns Array -> Eine neue Liste von Freundschaftsempfehlungen, die keine Freunde des Benutzers enthalten.
 */

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