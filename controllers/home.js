exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Trang chủ",
    path: "/home",
    user: req.user,
  });
};
