const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

// router.get/post("{link}", {controler});

router.get("/information", userController.getUserInfomationPage);

router.post("/update-information", userController.postUserInfomationUpdate);

router.get("/working-time", userController.getWorkingTimePage);

router.get("/working-time/search", userController.getWorkingTimeSearchPage);

router.get("/working-time/salary", userController.getSalarySearchPage);

router.post("/working-time/post-salary", userController.postSalarySearchPage);

router.post("/covid/post-temp", userController.postTempReport);

router.post("/covid/post-covid-registered", userController.postCovidRegistered);

router.post("/covid/post-vaccine", userController.postVaccineInformation);

router.get("/covid", userController.getCovidPage);

module.exports = router;
