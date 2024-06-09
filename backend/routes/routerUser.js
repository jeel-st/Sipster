//Imports
const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const userController = require('../controllers/controllerUser')
const registerController = require('../controllers/controllerRegister')

//Router, die an Controller weiterleiten
router.get('/:username', userController.getUserData)
router.get('/:username/events', userController.getEvents)
router.put('/changeFirstName', userController.changeFirstName)
router.put('/changeLastName', userController.changeLastName)
router.post('/changeUsername', userController.postNewUsername)
router.post('/changePassword', userController.postNewPassword)
router.post('/changeEmail', userController.postNewEmail)
router.post('/addEvent', userController.addEvent)
router.delete('/:userID/:password', registerController.deleteRegister)

module.exports = router