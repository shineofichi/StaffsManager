const User = require("../models/user");

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
  User.updateOne({ _id: req.user._id }, updatedUser).then(() => {
    console.log("Updated Information!");
    res.redirect("user/information");
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
exports.getCovidRegisteredPage = (req, res, next) => {
  res.render("covid/isCovid.ejs", {
    pageTitle: "Khai báo dương tính Covid",
    user: req.user,
  });
};
exports.getVaccinesPage = (req, res, next) => {
  res.render("covid/vaccine.ejs", {
    pageTitle: "Thông tin Vaccine đã tiêm",
    user: req.user,
  });
};
