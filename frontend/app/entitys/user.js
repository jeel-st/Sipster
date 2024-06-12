class User {
    constructor(userData) {
        {/* User Information */ }
        this.userID = userData._id;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.fullName = `${userData.firstName} ${userData.lastName}`;
        this.username = userData.username;
        this.email = userData.email;
        this.profilePicture = userData.profilePicture;
        this.lastLogin = new Date();

        {/* Friends Information */ }
        this.friends = userData.friends;
    }

    present() {
        const friendNames = this.friends.map(friend => friend.fullName).join(', ');
        return `\nUser ID: ${this.userID}\n` +
            `Name: ${this.firstName} ${this.lastName}\n` +
            `Username: ${this.username}\n` +
            `Email: ${this.email}\n` +
            `Profile Picture: ${this.profilePicture}\n` +
            `Last Login: ${this.lastLogin}\n` +
            `Friends: ${friendNames}\n`;
    }
}

module.exports = User;