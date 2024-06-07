//Imports
const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const friendSystemController = require('../controllers/controllerFriendSystem')

//Router, die an Controller weiterleiten
router.get('/invitations/:username', friendSystemController.getInvitations)
router.post('/', friendSystemController.postFriendRequest)
router.delete('/:fromUsername/:toUsername', friendSystemController.deleteFriendRequest)
router.get('/:username', friendSystemController.getFriendList)
router.get('/:username/:input', friendSystemController.getFriendRecommendations)


module.exports = router