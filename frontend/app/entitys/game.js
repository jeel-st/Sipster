const { gameLog } = require("../utils/logger/config");

class Game{
    constructor(gameData){
        this.ID = gameData._id;
        this.name = gameData.name;
        this.thumbnail = gameData.thumbnail;
        this.description = gameData.description;
        this.playtime = gameData.playtime;
        this.category = gameData.category;
        this.status = gameData.status;
    }

    toObject() {
        return {
            ID: this.ID ?? 0,
            name: this.name ?? '',
            thumbnail: this.thumbnail ?? '',
            description: this.description ?? '',
            playtime: this.playtime ?? 0,
            status: this.status ?? ''
        };
    }

    static fromObject(obj) {
        return new Game({
            _id: obj.ID,
            name: obj.name,
            thumbnail: obj.thumbnail,
            description: obj.description,
            playtime: obj.playtime,
            status: obj.status
        });
    }

    present() {
        gameLog.debug(`ID: ${this.ID}` +
                    `\nName: ${this.name}` +
                    `\nThumbnail: ${this.thumbnail}` +
                    `\nDescription: ${this.description}` +
                    `\nPlaytime: ${this.playtime}` +
                    `\nCategory: ${this.category}` +
                    `\nStatus: ${this.status}`)
    }
}

module.exports = Game;