const express = require('express')
const path = require('path')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const profilePictureController = require("../controllers/controllerProfilePicture")


router.post("/", profilePictureController.uploadProfilePicture)

module.exports = router
