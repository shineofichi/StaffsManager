const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

// router.get/post("{link}", {controler});

router.get("/information", userController.getUserInfomationPage);

router.get("/working-time", userController.getWorkingTimePage);

router.get("/working-time/search", userController.getWorkingTimePage);

router.get("/working-time/salary", userController.getSalarySearchPage);

module.exports = router;
