/*
    User Class to create a user object

    @param userData: object -> the user object
*/
class User {
    constructor(userData) {
        {/* User Information */ }
        this._id = userData._id;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.fullName = `${userData.firstName} ${userData.lastName}`;
        this.username = userData.username;
        this.registerDate = userData.registerDate;
        this.email = userData.email;
        this.profilePicture = userData.profilePicture;
        this.sips = userData.sips;
        this.lastLogin = new Date();

        {/* Friends Information */ }
        this.friends = userData.friends;
    }

    // Method to log the details of the User
    present() {
        const friendNames = this.friends.map(friend => friend.fullName).join(', ');
        return `\nUser ID: ${this._id}\n` +
            `Name: ${this.firstName} ${this.lastName}\n` +
            `Username: ${this.username}\n` +
            `Email: ${this.email}\n` +
            `Profile Picture: ${this.profilePicture}\n` +
            `Last Login: ${this.lastLogin}\n` +
            `Friends: ${friendNames}\n`;
    }
}

module.exports = User;