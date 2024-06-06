const express = require("express")
const router = express.Router()
const logMiddleware = require("./logMiddleware");

router.use(logMiddleware);

const sipsController = require("../controllers/controllerSips")


router.put("/friends", sipsController.changeSipsForFriends)

router.route("/:username")
    .get(sipsController.getSips)
    .put(sipsController.changeSips);


module.exports = router