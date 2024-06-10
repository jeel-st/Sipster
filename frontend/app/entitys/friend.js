class Friend {
    constructor(friend) {
        this.userID = friend._id;
        this.firstName = friend.firstName;
        this.lastName = friend.lastName;
        this.fullName = `${friend.firstName} ${friend.lastName}`;
        this.registerDate = friend.registerDate;
        this.username = friend.username;
        this.profilePicture = friend.profilePicture;
        this.lastLogin = new Date();
    }

    present() {
        return `User ID: ${this.userID}\n` +
            `Name: ${this.firstName} ${this.lastName}\n` +
            `Username: ${this.username}\n` +
            `Register Date: ${this.registerDate}`;
    }
}

module.exports = Friend;