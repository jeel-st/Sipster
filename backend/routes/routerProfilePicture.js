const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const profilePictureController = require("../controllers/controllerProfilePicture")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../resources/profilePictures'));
    },
    filename: function (req, file, cb) {

        const username = req.body.username;
        const originalname = file.originalname;
        const filename = `profilePicture_${username}${path.extname(originalname)}`;
        cb(null, filename);
    }
});

const upload = multer({storage: storage})

router.post("/", upload.single('image'), profilePictureController.uploadProfilePicture)

module.exports = router