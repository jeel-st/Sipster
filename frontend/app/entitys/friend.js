class Friend {
    constructor(firstName, lastName, registerDate, username, profilePicture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.registerDate = registerDate;
        this.username = username;
        this.profilePicture = profilePicture;
    }

    present() {
        return `Name: ${this.firstName} ${this.lastName}\n` +
            `Username: ${this.username}\n` +
            `Register Date: ${this.registerDate}`;
    }
}

module.exports = Friend;