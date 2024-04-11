const express = require('express')
const router = express.Router()

const loginController = require('../controllers/login')

router.get('/:username/:password', loginController.getLogin)

module.exports = router