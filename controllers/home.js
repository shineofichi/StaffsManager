exports.getHomepage = (req, res, next) => {
  res.render("checkinPage/checkin", {
    pageTitle: "Checkin",
    path: "/checkin",
    user: {
      name: "AnhTT",
    },
    isWorking: false,
    timeRecord: {
      startTime: "9:00",
      location: "Công ty",
    },
  });
};
