const User = require("../models/user");
const TempReport = require("../models/tempReport");
const Vaccine = require("../models/vaccinesInfomation");

exports.getUserInfomationPage = (req, res, next) => {
  res.render("userInfomation", {
    pageTitle: "Thông tin cá nhân",
    user: req.user,
  });
};

exports.postUserInfomationUpdate = (req, res, next) => {
  const updatedUser = {
    name: req.body.name,
    doB: req.body.doB,
    department: req.body.department,
    salaryScale: req.body.salaryScale,
    startDate: req.body.startDate,
    annualLeave: req.body.annualLeave,
    imageUrl: req.body.imageUrl,
  };
  User.updateOne({ _id: req.user._id }, updatedUser)
    .then(() => {
      console.log("Updated Information!");
      res.redirect("/user/information");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getWorkingTimePage = (req, res, next) => {
  res.render("workingTimeSearch/index.ejs", {
    pageTitle: "Tra cứu thông tin giờ làm",
    user: req.user,
  });
};

exports.getWorkingTimeSearchPage = (req, res, next) => {
  res.render("workingTimeSearch/workingTime.ejs", {
    pageTitle: "Tra cứu thông tin giờ làm",
    user: req.user,
  });
};

exports.getSalarySearchPage = (req, res, next) => {
  res.render("workingTimeSearch/salary.ejs", {
    pageTitle: "Tra cứu thông tin giờ làm",
    user: req.user,
  });
};

exports.getCovidPage = (req, res, next) => {
  const userId = req.user._id;
  TempReport.find({ userId: userId }).then((tempReport) => {
    const data = tempReport.map((temp) => {
      const formatedDate = temp.time
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      const formatedTemp = { ...temp._doc, time: formatedDate };
      return formatedTemp;
    });
    console.log(data);
    res.render("covid/index.ejs", {
      pageTitle: "Thông tin Covid",
      user: req.user,
      tempReport: data,
    });
  });
};

exports.postTempReport = (req, res, next) => {
  const temp = req.body.temp;
  const time = new Date().getTime();
  const newTempReport = new TempReport({
    temp: temp,
    time: time,
    userId: req.user._id,
  });
  newTempReport
    .save()
    .then(() => {
      console.log("Reported Temp");
      res.redirect("/user/covid");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCovidRegistered = (req, res, next) => {
  const userId = req.body.id;
  User.updateOne({ _id: userId }, { isCovid: true })
    .then(() => {
      console.log("Covid Registered!");
      res.redirect("/user/covid");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postVaccineInformation = (req, res, next) => {
  const date = req.body.date;
  const times = req.body.times;
  const name = req.body.vaccine;
  const newVaccineInfo = new Vaccine({
    date: date,
    times: times,
    name: name,
    userId: req.user._id,
  });
  newVaccineInfo
    .save()
    .then(() => {
      console.log("Send Vaccine Info success!");
      res.redirect("/user/covid");
    })
    .catch((err) => {
      console.log(err);
    });
};
