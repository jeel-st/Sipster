/*
    This class is used to represent an activity in the system. An activity is a post that a user makes in the system.
    It contains the before and after images, the reactions, the caption, the game, the user, and the tagged friends.

    @param game: object -> the game object
    @param user: object -> the user object
    @param taggedFriends: array -> the tagged friends
*/
class Activity {
    constructor(game, user, taggedFriends) {
        this.game = game;
        this.user = user;
        this.taggedFriends = taggedFriends;
    }

    present() {
        return `Activity ID: ${this.ID}` +
            `\nBefore Image Path: ${this.beforeImagePath}` +
            `\nAfter Image Path: ${this.afterImagePath}` +
            `\nReactions: ${this.reactions}` +
            `\nCaption: ${this.caption}` +
            `\nGame: ${this.game}` +
            `\nUser: ${this.user}`
    }
}

module.exports = Activity;