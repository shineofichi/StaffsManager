const Checkin = require("../models/checkin");
const Checkout = require("../models/checkout");
const User = require("../models/user");

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

exports.postCheckin = (req, res, next) => {
  const location = req.body.location;
  const userId = req.user._id;
  const timeStart = new Date().getTime();
  const checkinRecord = new Checkin({
    location: location,
    timeStart: timeStart,
    userId: userId,
  });
  checkinRecord
    .save()
    .then(() => {
      console.log("Checked In!");
      User.updateOne({ _id: userId }, { isWorking: true });
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/working/checkout");
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

exports.postCheckout = (req, res, next) => {
  Checkin.find({ userId: req.user._id })
    .then((checkin) => {
      const location = checkin[0].location;
      const userId = checkin[0].userId;
      const timeStart = checkin[0].timeStart;
      const timeEnd = new Date().getTime();
      const checkoutRecord = new Checkout({
        userId: userId,
        location: location,
        timeStart: timeStart,
        timeEnd: timeEnd,
      });
      return checkoutRecord.save();
    })
    .then(() => {
      return Checkin.deleteMany({ userId: req.user._id });
    })
    .then(() => {
      console.log("Checkout!");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/working/checkout");
};

exports.getAnnualLeavePage = (req, res, next) => {
  res.render("working/annualleave", {
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
