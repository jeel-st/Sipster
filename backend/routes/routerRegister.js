const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const registerController = require('../controllers/controllerRegister')

router.post('/', registerController.postRegister)
router.delete('/:username/:password', registerController.deleteRegister)

module.exports = router