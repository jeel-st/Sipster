const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const activitiesController = require('../controllers/controllerActivities')

router.post('/postActivity', activitiesController.postActivity)
router.put('/addReaction', activitiesController.addReaction)
router.get('/:userID', activitiesController.getActivities)
router.put('/postBeforePicture', activitiesController.postBeforePicture)
router.put('/postAfterPicture', activitiesController.postAfterPicture)

module.exports = router