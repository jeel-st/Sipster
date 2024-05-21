class Activity {
    constructor(ID, beforeImagePath, afterImagePath, emojis, comment, gameID, creator, taggedFriends) {
        this.ID = ID;
        this.beforeImagePath = beforeImagePath;
        this.afterImagePath = afterImagePath;
        this.emojis = emojis;
        this.comment = comment;
        this.gameID = gameID;
        this.creator = creator;
        this.taggedFriends = taggedFriends;
    }

    present() {
        return `Activity ID: ${this.ID}` +
            `\nBefore Image Path: ${this.beforeImagePath}` +
            `\nAfter Image Path: ${this.afterImagePath}` +
            `\nEmojis: ${this.emojis}` +
            `\nComment: ${this.comment}` +
            `\nGame ID: ${this.gameID}` +
            `\nCreator ID: ${this.creatorID}`
    }
}

module.exports = Activity;