exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Trang chủ",
    path: "/home",
    user: {
      name: req.user.name,
    },
  });
};
