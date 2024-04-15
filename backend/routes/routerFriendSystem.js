const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const friendSystemController = require('../controllers/controllerFriendSystem')

router.post('/', friendSystemController.postFriendRequest)
router.delete('/:fromSipsterID/:toSipsterID', friendSystemController.deleteFriendRequest)
router.get('/:username', friendSystemController.getFriendList)
router.get('/reccommendations/:input', friendSystemController.getFriendRecommendations)
router.get('/invitations/:username', friendSystemController.getInvitations)

module.exports = router