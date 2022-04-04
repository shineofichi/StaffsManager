exports.getHomepage = (req, res, next) => {
  res.render("checkinPage/checkin", {
    pageTitle: "Checkin",
    path: "/checkin",
    user: {
      name: req.user.name,
    },
    isWorking: false,
    // timeRecord: {
    //   startTime: "9:00",
    //   location: "Công ty",
    // },
  });
};
