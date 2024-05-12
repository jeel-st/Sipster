class User {
    constructor(firstName, lastName, registerDate, username, email, friends, profilePicture) {
        {/* User Information */ }
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.registerDate = registerDate;
        this.profilePicture = profilePicture;

        {/* Friends */ }
        this.friends = friends;
    }

    present() {
        return `Name: ${this.firstName} ${this.lastName}\n` +
            `Sipster ID: ${this.username}\n` +
            `Email: ${this.email}\n` +
            `Register Date: ${this.registerDate}`;
    }
}

module.exports = User