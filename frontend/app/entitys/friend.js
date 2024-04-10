class User {
    constructor(firstName, lastName, registerDate, username, tagline, email) {
        {/* User Information */ }
        this.firstName = firstName,
            this.lastName = lastName,
            this.sipsterID = username + '#' + tagline,
            this.registerDate = registerDate
    }

    present() {
        return `Name: ${firstName()} ${lastName()}\n` +
            `Sipster ID: ${sipsterID()}\n` +
            `Register Date: ${registerDate()}`
    }

    get firstName() {
        return this.firstName
    }

    get lastName() {
        return this.lastName
    }

    get sipsterID() {
        return this.sipsterID
    }

    get registerDate() {
        return this.registerDate
    }
}