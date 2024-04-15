class Relationship {
    constructor(fromSipsterID, toSipsterID, status) {
        this.fromSipsterID = fromSipsterID,
            this.toSipsterID = toSipsterID,
            this.status = status
    }

    get fromSipsterID() {
        return this.fromSipsterID
    }

    get toSipsterID() {
        return this.toSipsterID
    }

    get status() {
        return this.status
    }
}

export default Relationship