const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

// router.get/post("{link}", {controler});

router.get("/information", userController.getUserInfomationPage);

router.get("/working-time", userController.getWorkingTimePage);

router.get("/working-time/search", userController.getWorkingTimePage);

router.get("/working-time/salary", userController.getSalarySearchPage);

router.get("/covid", userController.getCovidPage);

router.get("/covid/temp-report", userController.getTempReportPage);

router.get("/covid/covid-registered", userController.getCovidRegisteredPage);

router.get("/covid/vaccine", userController.getVaccinesPage);

module.exports = router;
