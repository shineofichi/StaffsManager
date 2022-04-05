exports.getUserInfomationPage = (req, res, next) => {
  res.render("userInfomation", {
    pageTitle: "Thông tin cá nhân",
  });
};

exports.getWorkingTimePage = (req, res, next) => {
  res.render("/workingTimeSearch/index.ejs", {
    pageTitle: "Tra cứu thông tin giờ làm",
  });
};

exports.getWorkingTimeSearchPage = (req, res, next) => {
  res.render("/workingTimeSearch/workingTime.ejs", {
    pageTitle: "Tra cứu thông tin giờ làm",
  });
};

exports.getSalarySearchPage = (req, res, next) => {
  res.render("/workingTimeSearch/workingTime.ejs", {
    pageTitle: "Tra cứu thông tin giờ làm",
  });
};
