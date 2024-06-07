const express = require('express')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const activitesController = require('../controllers/controllerActivities')

router.post('/postActivity', activitesController.postActivity)
router.get('/:username', activitesController.getActivities)
router.put('/postBeforePicture', activitesController.postBeforePicture)
router.put('/postAfterPicture', activitesController.postAfterPicture)

module.exports = router