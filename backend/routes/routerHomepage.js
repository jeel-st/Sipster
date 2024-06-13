//Imports
const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const homepageController = require('../controllers/controllerHomepage')

//Router, die an Controller weiterleiten
router.get('/:userID', homepageController.getHomepage)


module.exports = router