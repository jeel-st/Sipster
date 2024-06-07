//Imports
const express = require('express') 
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const loginController = require('../controllers/controllerLogin')

//Router, die an Controller weiterleiten
router.get('/:username/:password', loginController.getLogin)

module.exports = router