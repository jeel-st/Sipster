//Imports
const express = require('express') 
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const loginController = require('../controllers/controllerLogin')

//Router, die an Controller weiterleiten
router.post('/', loginController.getLogin) //post da wir einen Body mitgeben und nicht params

module.exports = router