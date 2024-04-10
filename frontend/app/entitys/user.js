class User {
    constructor(firstName, lastName, registerDate, username, tagline, email) {
        {/* User Information */ }
        this.firstName = firstName,
            this.lastName = lastName,
            this.sipsterID = username + '#' + tagline,
            this.email = email,
            this.registerDate = registerDate,

            {/* Friends */ }
        this.friendsPending = [],
            this.friendsIncoming = [],
            this.friendsConfirmed = []
    }

    present() {
        return `Name: ${firstName()} ${lastName()}\n` +
            `Sipster ID: ${sipsterID()}\n` +
            `Email: ${email()}\n` +
            `Register Date: ${registerDate()}`;
    }

    set friendsPending(relations) {
        this.friendsPending = relations
    }

    set friendsIncoming(relations) {
        this.friendsIncoming = relations
    }

    set friendsConfirmed(relations) {
        this.friendsConfirmed = relations
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

    get email() {
        return this.email
    }

    get registerDate() {
        return this.registerDate
    }

    get friendsPending() {
        return this.friendsPending
    }

    get friendsIncoming() {
        return this.friendsIncoming
    }

    get friendsConfirmed() {
        return this.friendsIncoming
    }
}