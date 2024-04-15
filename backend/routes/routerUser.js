const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const userController = require('../controllers/controllerUser')
const registerController = require('../controllers/controllerRegister')

router.get('/:username', userController.getUserData)
router.post('/:username/:newUsername', userController.postNewUsername)
router.delete('/:username/:password', registerController.deleteRegister)

module.exports = router