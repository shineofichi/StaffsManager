const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

// router.get/post("{link}", {controler});

router.get("/information", userController.getUserInfomationPage);

router.post("/update-information", userController.postUserInfomationUpdate);

router.get("/working-time", userController.getWorkingTimePage);

router.get("/working-time/search", userController.getWorkingTimePage);

router.get("/working-time/salary", userController.getSalarySearchPage);

// router.get("/covid/temp-report", userController.getTempReportPage);

router.post("/covid/post-temp", userController.postTempReport);

// router.get("/covid/covid-registered", userController.getCovidRegisteredPage);

router.post("/covid/post-covid-registered", userController.postCovidRegistered);

// router.get("/covid/vaccine", userController.getVaccinesPage);

router.post("/covid/post-vaccine", userController.postVaccineInformation);

router.get("/covid", userController.getCovidPage);

module.exports = router;
