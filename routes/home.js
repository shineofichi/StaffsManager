const path = require("path");

const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

// router.get/post("{link}", {controler});

router.get("/working/checkin", homeController.getCheckinPage);

router.get("/working/checkout", homeController.getCheckoutPage);

router.get("/working/annualleave", homeController.getCheckoutPage);

router.get("/working", homeController);

module.exports = router;
