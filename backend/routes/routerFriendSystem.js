//Imports
const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const friendSystemController = require('../controllers/controllerFriendSystem')

//Router, die an Controller weiterleiten
router.get('/invitations/:userID', friendSystemController.getInvitations)
router.post('/', friendSystemController.postFriendRequest)
router.delete('/:fromUserID/:toUserID', friendSystemController.deleteFriendRequest)
router.get('/:userID', friendSystemController.getFriendList)
router.get('/:userID/:input', friendSystemController.getFriendRecommendations)


module.exports = router