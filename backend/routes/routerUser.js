//Imports
const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const userController = require('../controllers/controllerUser')
const registerController = require('../controllers/controllerRegister')

//Router, die an Controller weiterleiten
router.get('/:username', userController.getUserData)
router.get('/events/:userID', userController.getEvents)
router.get('/events/notStored/:userID', userController.getNotStoredEvents)
router.put('/changeFirstName', userController.changeFirstName)
router.put('/changeLastName', userController.changeLastName)
router.put('/changeUsername', userController.postNewUsername)
router.put('/changePassword', userController.postNewPassword)
router.put('/changeEmail', userController.postNewEmail)
router.put('/addEvent', userController.addEvent)
router.delete('/:userID', registerController.deleteRegister)

module.exports = router