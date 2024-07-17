/*
    This class is used to create a friend object.

    @param friend: object -> the friend object
*/
class Friend {
    constructor(friend) {
        this._id = friend._id;
        this.firstName = friend.firstName;
        this.lastName = friend.lastName;
        this.fullName = `${friend.firstName} ${friend.lastName}`;
        this.registerDate = friend.registerDate;
        this.username = friend.username;
        this.profilePicture = friend.profilePicture;
        this.lastLogin = new Date();
    }

    // Method to log the details of the Friend
    present() {
        return `User ID: ${this._id}\n` +
            `Name: ${this.firstName} ${this.lastName}\n` +
            `Username: ${this.username}\n` +
            `Register Date: ${this.registerDate}`;
    }
}

module.exports = Friend;