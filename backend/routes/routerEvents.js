const express = require('express')
const router = express.Router()

const eventsController = require('../controllers/controllerEvents')

router.get('/', eventsController.getEvents)
router.post('/', eventsController.postEvents)
router.delete('/:date/:name/:time/:header/', eventsController.deleteEvents)

module.exports = router