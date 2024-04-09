const express = require('express')
const router = express.Router()

const registerController = require('../controllers/register')

router.post('/', registerController.postRegister)
router.delete('/:username/:tagline', registerController.deleteRegister)

module.exports = router