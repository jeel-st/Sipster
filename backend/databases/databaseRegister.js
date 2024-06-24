//Imports
const database = require("./databaseMain")
const { isValidPassword, isValidEmail, encryptPassword, encryptPasswordWithSalt } = require('../utils/registerLogic/registerPatterns')
const log = require("../logging/logger")
const databaseFriend = require("./databaseFriendSystem")
const { ObjectId, MongoClient } = require("mongodb")

/**
 * Diese Methode dient dazu, einen neuen Benutzer zu registrieren.
 * 
 * @param req: Request-Objekt -> Enthält die Benutzerdaten im Body (username, password, email, firstName, lastName)
 * @return: String -> "Success!" bei erfolgreicher Registrierung, oder ein Fehlerstring bei Problemen
 */

async function postUser(req){
    const { username, password, email, firstName, lastName} = req.body
    const friends = []
    const timestamp = Date.now()
    const registerDate = new Date(timestamp).toISOString();
    const profilePicture = null
    const profilePictureCom200 = null
    const profilePictureCom1080 = null
    const sips = 0

    encryptedPasswordAndSalt = await encryptPassword(password)
    encryptedPassword = encryptedPasswordAndSalt[0]
    salt = encryptedPasswordAndSalt[1]
    
    const personalData = { username, profilePicture, profilePictureCom200, profilePictureCom1080, encryptedPassword, salt, email, firstName, lastName, registerDate, friends, sips }
    
    const usernameFinder = await database.getDB().collection("personalInformation").findOne({ username: username})
    const emailFinder = await database.getDB().collection("personalInformation").findOne({ email: email })

    if (isValidPassword(password)) {
        
        if (isValidEmail(email)) {

            if (usernameFinder) {
                return "Duplicate username"
            } else if (emailFinder) {
                
                return "Duplicate Email"
            } else {
                await database.getDB().collection('personalInformation').insertOne(personalData)

                const userIDObj = await database.getSipsterID(username)
                const userID = userIDObj.toString()
                await databaseFriend.acceptFriendRequest(userID,"663bd3b7969fc6302facf1ee")

                return "Success!"
            }
        } else {
            return "Email format false"
        }
    } else {
        return "Password format false"
    }

}

/**
 * Diese Methode dient dazu, einen Benutzer zu löschen.
 * 
 * @param req: Request-Objekt -> Enthält die UserID und das Passwort in den Parametern (userID, password)
 * @return: String -> "Benutzer erfolgreich gelöscht" bei erfolgreicher Löschung, oder ein Fehlerstring bei Problemen
 * @throws Error -> Bei Fehlern während des Löschvorgangs
 */

async function deleteUser(req){
    const userID = new ObjectId(req.params.userID)
    const personalInformation = await database.getDB().collection("personalInformation")
    try {
        const user = await personalInformation.findOne({_id: userID})
        if (user == null) {
            return "Benutzer nicht gefunden"
        } else {
            const result = await personalInformation.deleteOne({ _id: userID })
            if (result.deletedCount === 0) {
                return "user wurde nicht gefunden"
            }
            try {
    
            const deletedFromFriends = await deleteUserFromFriends(userID)
            console.log("deleted friends succesfull " + deletedFromFriends)
            const deletedActivities = await deleteActivitiesFromDeletedUser(userID)
            console.log("deleted activities succesfull " + deletedActivities)
            const deletedReactions = await deleteReactionsFromDeletedUser(userID)
            console.log("deleted reactions succesfull " + deletedReactions)
            const deletedInvitations = await deleteUserFromInvitation(userID)
            console.log("deleted invitations succesfull " + deletedInvitations)
            log.info(`
            User was deleted from ${deletedFromFriends} friend(s).
            ${deletedActivities} Activitie(s) from the user were deleted.
            ${deletedReactions} Reaction(s) from the user were deleted.
            ${deletedInvitations} Invitation(s) deleted.
            `)
            }catch (err) {
                log.error(err)
                return ("Something went wrong with the connected deletions")
            }
            return "Benutzer erfolgreich gelöscht"
        }
    } catch (error) {
        log.error("Fehler beim Löschen des Benutzers:", error)
        return "Interner Serverfehler"
    }
}

/**
 * Diese Methode dient dazu, einen Benutzer aus den Freundeslisten anderer Benutzer zu entfernen.
 * 
 * @param usernameToRemove: String -> Der Benutzername des zu entfernenden Benutzers
 * @return: Integer --> The number of users that got updated
 */

async function deleteUserFromFriends(userIDToRemove) {
    const result = (await database.initializeCollections()).personalInformation.updateMany(
        { friends: userIDToRemove},
        { $pull: { friends: userIDToRemove} }
    );

    return result.modifiedCount
}

/**
 * This method deletes all the invitations of a user 
 * (happens if a user gets deleted)
 * 
 * @param userIDToRemove: ObjectID --> the id from which the invitations get removed
 * @returns INT --> the number of deleted invitations
 */
async function deleteUserFromInvitation(userIDToRemove) {
    const invitations = (await database.initializeCollections()).invitations

    const result = await invitations.deleteMany(
        { $or: [
            { fromID: userIDToRemove },
            { toID: userIDToRemove }
          ]}
    )
    return result.deletedCount 
}

/**
 * This method deletes all the Activites of a user 
 * (happens if a user gets deleted)
 * 
 * @param userIDToRemove:  ObjectID --> the id from which the activities get removed
 * @returns integer --> Number of deleted Activities
 */
async function deleteActivitiesFromDeletedUser(userIDToRemove) {
        const activities = (await database.initializeCollections()).activities
        const result = await activities.deleteMany(
            { userID: userIDToRemove}
        )

        return result.deletedCount

}

/**
 * This method deletes all the Reactions of Activities of a user 
 * (happens if a user gets deleted)
 * 
 * @param userIDToRemove:  ObjectID --> the id from which the reactions get removed
 * @returns integer --> Number of deleted reactions
 */
async function deleteReactionsFromDeletedUser(userIDToRemove) {
        const activities = (await database.initializeCollections()).activities

        const result = await activities.deleteMany(
            {
                $or: Object.keys(database.reactionsTemplate).map(key => ({ [`reactions.${key}`]: userIDToRemove }))
            },
            {
                $pull: Object.keys(database.reactionsTemplate).reduce((acc, key) => {
                    acc[`reactions.${key}`] = userIDToRemove;
                    return acc;
                  }, {})
            }
        )
        return result.deletedCount
}

module.exports = {
    postUser,
    deleteUser
}