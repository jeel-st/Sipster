const express = require('express')
const router = express.Router()

const friendSystemController = require('../controllers/controllerFriendSystem')

router.post('/', friendSystemController.postFriendRequest)
router.delete('/:fromSipsterID/:toSipsterID', friendSystemController.deleteFriendRequest)

module.exports = router