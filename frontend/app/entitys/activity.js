class Activity {
    constructor(ID, beforeImagePath, afterImagePath, emojis, caption, game, creator, taggedFriends) {
        this.ID = ID;
        this.beforeImagePath = beforeImagePath;
        this.afterImagePath = afterImagePath;
        this.emojis = emojis;
        this.caption = caption;
        this.game = game;
        this.creator = creator;
        this.taggedFriends = taggedFriends;
    }

    toObject() {
        return {
            ID: this.ID ?? 0,
            beforeImagePath: this.beforeImagePath ?? '',
            afterImagePath: this.afterImagePath ?? '',
            emojis: this.emojis ?? [],
            caption: this.caption ?? '',
            game: this.game ?? {},
            creator: this.creator ?? {},
            taggedFriends: this.taggedFriends ?? []
        };
    }

    static fromObject(obj) {
        return new Activity(
            obj.ID,
            obj.beforeImagePath,
            obj.afterImagePath,
            obj.emojis,
            obj.caption,
            obj.game,
            obj.creator,
            obj.taggedFriends
        );
    }

    present() {
        return `Activity ID: ${this.ID}` +
            `\nBefore Image Path: ${this.beforeImagePath}` +
            `\nAfter Image Path: ${this.afterImagePath}` +
            `\nEmojis: ${this.emojis}` +
            `\nCaption: ${this.caption}` +
            `\nGame: ${this.game}` +
            `\nCreator: ${this.creator}`
    }
}

module.exports = Activity;