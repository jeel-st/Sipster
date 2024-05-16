class Game{
    constructor(gameData){
        this.gameID = gameData._id;
        this.name = gameData.name;
        this.thumbnail = gameData.thumbnail;
        this.description = gameData.description;
        this.playtime = gameData.playtime;
    }

    present() {
        console.log(`ID: ${this.gameID}` +
                    `\nName: ${this.name}` +
                    `\nThumbnail: ${this.thumbnail}` +
                    `\nDescription: ${this.description}` +
                    `\nPlaytime: ${this.playtime}`);
    }
}