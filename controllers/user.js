exports.getUserInfomationPage = (req, res, next) => {
  res.render("userInfomation", {
    pageTitle: "Thông tin cá nhân",
    user: req.user,
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
