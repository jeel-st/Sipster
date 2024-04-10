import Relationship from '../entitys/relationship'

function loadFriends(user) {
    const relationships = loadRelationsships(user)

    const { friendsPending, friendsIncoming, friendsConfirmed } = []

    relationships.forEach(relationship => {
        if (relationship.status === 'pending') {
            friendsPending.push(relationship)
        } else if (relationship.status === 'incoming') {
            friendsIncoming.push(relationship)
        } else if (relationship.status === 'confirmed') {
            friendsConfirmed.push(relationship)
        }
    })

    user.friendsPending = friendsPending
    user.friendsIncoming = friendsIncoming
    user.friendsConfirmed = friendsConfirmed
}

async function loadRelationsships(user) {
    const reponse = axios.get(`http://85.215.71.124/relations/${user.sipsterID}`).catch(error => console.log(error))

    const relationships = response.data.map(relationshipData => {
        return new Relationship(relationshipData.fromSipsterID, relationshipData.toSipsterID, relationshipData.status)
    });

    return relationships
}