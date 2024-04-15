const bcrypt = require('bcrypt')

function isValidEmail(email) {

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email);
}

function isValidPassword(password) {
    console.log(password)

    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/
    console.log(passwordPattern.test(password))
    return passwordPattern.test(password);
}

async function encryptPassword(password) {
    let encryptedPassword = 'fail';
    let salt = 'fail';
    let saltRounds = 10;
    await bcrypt
        .genSalt(saltRounds)
        .then(generatedSalt => {
            salt = generatedSalt;
            console.log('Salt: ', generatedSalt)
            return bcrypt.hash(password, generatedSalt)
        })
        .then(hash => {
            console.log('Hash: ', hash)
            encryptedPassword = hash;
        })
        .catch(err => console.error(err.message))
    console.log('password: ' + encryptedPassword)
    return [encryptedPassword, salt]
}

async function encryptPasswordWithSalt(salt, password){
    let encryptedPassword = 'fail'
    let saltRounds = 10;
    await bcrypt
        .hash(password, salt)
        .then(hash => {
            console.log('Hash: ', hash)
            encryptedPassword = hash;
        })
        .catch(err => console.error(err.message))
    return encryptedPassword

}

module.exports = {
    isValidEmail, isValidPassword, encryptPassword, encryptPasswordWithSalt
}