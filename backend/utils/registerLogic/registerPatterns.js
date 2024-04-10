function isValidEmail(email) {

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email);
}

function isValidPassword(password) {

    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/

    return passwordPattern.test(password);
}
module.exports = {
    isValidEmail, isValidPassword
}