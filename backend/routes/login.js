const express = require('express') 
const router = express.Router()

const loginController = require('../controllers/login')

router.get('/:username/:password/:tagline', loginController.getLogin)

module.exports = router