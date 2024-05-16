const { fetchFriendsData } = require("../utils/database/friendsFetcher");

class User {
    constructor(userData) {
        {/* User Information */ }
        this.userID = userData._id;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.fullName = `${userData.firstName} ${userData.lastName}`;
        this.username = userData.username;
        this.email = userData.email;
        this.registerDate = userData.registerDate;
        this.profilePicture = userData.profilePicture;

        {/* Friends Information */ }
        this.friends = null;
    }

    async initializeFriends() {
        this.friends = await fetchFriendsData(this.username);
    }

    async present() {
        // Ensure friends are initialized before presenting user data
        if (!this.friends) {
            await this.initializeFriends();
        }
        return `User ID: ${this.userID}\n` +
            `Name: ${this.firstName} ${this.lastName}\n` +
            `Username: ${this.username}\n` +
            `Email: ${this.email}\n` +
            `Register Date: ${this.registerDate}\n` +
            `Friends: ${this.friends}\n`;
    }
}

module.exports = User;