const express = require('express') 
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const loginController = require('../controllers/controllerLogin')

router.get('/:username/:password', loginController.getLogin)

module.exports = router