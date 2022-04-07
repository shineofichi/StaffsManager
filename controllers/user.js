const User = require("../models/user");
const TempReport = require("../models/tempReport");

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
      res.redirect("user/information");
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
  res.render("covid/index.ejs", {
    pageTitle: "Thông tin Covid",
    user: req.user,
  });
};

exports.getTempReportPage = (req, res, next) => {
  res.render("covid/temp.ejs", {
    pageTitle: "Báo cáo thân nhiệt",
    user: req.user,
  });
};
exports.postTempReport = (req, res, next) => {
  const temp = req.body.temp;
  const date = new Date().getDate();
  const newTempReport = new TempReport({
    temp: temp,
    time: date,
    userId: req.body.userId,
  });
  newTempReport
    .save()
    .then(() => {
      console.log("Reported Temp");
      res.redirect("/covid");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getCovidRegisteredPage = (req, res, next) => {
  res.render("covid/isCovid.ejs", {
    pageTitle: "Khai báo dương tính Covid",
    user: req.user,
  });
};
exports.postCovidRegistered = (req, res, next) => {
  const userId = req.body.id;
  User.updateOne({ _id: userId }, { isCovid: true })
    .then(() => {
      console.log("Covid Registered!");
      res.redirect("/covid");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getVaccinesPage = (req, res, next) => {
  res.render("covid/vaccine.ejs", {
    pageTitle: "Thông tin Vaccine đã tiêm",
    user: req.user,
  });
};
