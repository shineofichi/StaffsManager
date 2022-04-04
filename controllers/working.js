exports.getWorkingPage = (req, res, next) => {
  res.render("working/index", {
    pageTitle: "Điểm danh/Kết thúc giờ làm",
    path: "/working",
    user: {
      name: req.user.name,
    },
  });
};

exports.getCheckinPage = (req, res, next) => {
  res.render("working/checkin", {
    pageTitle: "Điểm danh",
    path: "/working",
    user: {
      name: req.user.name,
    },
  });
};

exports.getCheckoutPage = (req, res, next) => {
  res.render("working/checkout", {
    pageTitle: "Kết thúc điểm danh",
    path: "/working",
    user: {
      name: req.user.name,
    },
    timeRecord: {
      startTime: "9:00",
      location: "Công ty",
    },
  });
};

exports.getAnnualLeavePage = (req, res, next) => {
  res.render("working/checkout", {
    pageTitle: "Kết thúc điểm danh",
    path: "/working",
    user: {
      name: req.user.name,
    },
    timeRecord: {
      startTime: "9:00",
      location: "Công ty",
    },
  });
};
