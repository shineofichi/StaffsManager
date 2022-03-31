exports.getHomepage = (req, res, next) => {
  res.render("checkinPage/checkin", {
    pageTitle: "Checkin",
    path: "/checkin",
    user: {},
  });
};
