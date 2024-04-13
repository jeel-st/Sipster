class Friend {
    constructor(firstName, lastName, registerDate, username, profilbild) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.registerDate = registerDate;
        this.username = username;
        this.profilbild = profilbild;
    }

    present() {
        return `Name: ${this.firstName} ${this.lastName}\n` +
            `Username: ${this.username}\n` +
            `Register Date: ${this.registerDate}`;
    }
}

module.exports = Friend;