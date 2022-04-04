const path = require("path");

const express = require("express");

const workingController = require("../controllers/working");

const router = express.Router();

// router.get/post("{link}", {controler});

router.get("/working/checkin", workingController.getCheckinPage);

router.get("/working/checkout", workingController.getCheckoutPage);

router.get("/working/annualleave", workingController.getCheckoutPage);

router.get("/working", workingController.getWorkingPage);

module.exports = router;
