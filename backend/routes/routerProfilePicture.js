const express = require('express')
const path = require('path')

const router = express.Router()

const profilePictureController = require("../controllers/controllerProfilePicture")


router.post("/", profilePictureController.uploadProfilePicture)

module.exports = router
