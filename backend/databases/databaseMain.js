const { MongoClient } = require("mongodb")

let db = null;
const url = `mongodb://localhost:27017/`;

async function connectToDB() {
    MongoClient.connect(url
    ).then((connection) => {
        db = connection.db('sipster');
        console.log('connected to database sipster ...')
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err)
    });
}

function getDB() {
    return db
}

module.exports = {
    connectToDB,
    getDB
}