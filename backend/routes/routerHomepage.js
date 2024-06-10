//Imports
const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const registerController = require('../controllers/controllerHomepage')

//Router, die an Controller weiterleiten
router.get('/:userID', registerController.postRegister)


module.exports = router