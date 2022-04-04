const path = require("path");

const express = require("express");

const workingController = require("../controllers/working");

const router = express.Router();

// router.get/post("{link}", {controler});

router.get("/checkin", workingController.getCheckinPage);

router.get("/checkout", workingController.getCheckoutPage);

router.get("/annualleave", workingController.getAnnualLeavePage);

router.get("/", workingController.getWorkingPage);

module.exports = router;
