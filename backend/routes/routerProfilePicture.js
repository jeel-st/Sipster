//Imports
const express = require('express')
const path = require('path')
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const profilePictureController = require("../controllers/controllerProfilePicture")

//Router, die an Controller weiterleiten
router.post("/", profilePictureController.uploadProfilePicture)
router.get("/:username", profilePictureController.getProfilePicture)

module.exports = router
