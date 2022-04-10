const path = require("path");

const express = require("express");

const workingController = require("../controllers/working");

const router = express.Router();

// router.get/post("{link}", {controler});

router.post("/post-checkin", workingController.postCheckin);

// router.get("/checkout", workingController.getCheckoutPage);

router.post("/post-checkout", workingController.postCheckout);

// router.get("/annualleave", workingController.getAnnualLeavePage);

router.post("/post-annualleave", workingController.postAnnualLeave);

router.get("/", workingController.getWorkingPage);

module.exports = router;
