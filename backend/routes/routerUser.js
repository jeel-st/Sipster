const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const userController = require('../controllers/controllerUser')
const registerController = require('../controllers/controllerRegister')

router.get('/:username', userController.getUserData)
router.post('/changeUsername', userController.postNewUsername)
router.post('/changePassword', userController.postNewPassword)
router.post('/changeEmail', userController.postNewEmail)
router.delete('/:username/:password', registerController.deleteRegister)

module.exports = router