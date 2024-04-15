const express = require('express') 
const router = express.Router()

const loginController = require('../controllers/controllerLogin')

router.get('/:username/:password', loginController.getLogin)

module.exports = router