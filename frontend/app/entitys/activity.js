class Activity {
    constructor(game, user, taggedFriends){
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