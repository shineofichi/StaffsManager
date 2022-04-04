const path = require("path");

const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

// router.get/post("{link}", {controler});

router.get("/checkin", homeController.getHomepage);

router.get("/working", homeController);

module.exports = router;
