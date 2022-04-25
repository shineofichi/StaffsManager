const Checkin = require("../models/checkin");
const Checkout = require("../models/checkout");
const User = require("../models/user");
const AnnualLeave = require("../models/anuualLeave");

exports.getWorkingPage = (req, res, next) => {
  const userId = req.user._id;
  let canRegistered = false;
  User.find({ _id: userId })
    .then((user) => {
      if (user[0].annualLeave > 0) {
        canRegistered = true;
      }
      user[0].canRegistered = canRegistered;
      return user;
    })
    .then((user) => {
      Checkin.find({ userId: req.user._id }).then((checkin) => {
        let timeStart = "Chưa điểm danh";
        let location = "Chưa điểm danh";
        if (checkin[0]) {
          timeStart = checkin[0].timeStart
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "");
          location = checkin[0].location;
          user[0].location = location;
          user[0].timeStart = timeStart;
        }
        res.render("working/index", {
          pageTitle: "Màn hình làm việc",
          path: "/working",
          user: user[0],
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCheckin = (req, res, next) => {
  const location = req.body.location;
  const userId = req.user._id;
  const timeStart = new Date();
  const checkinRecord = new Checkin({
    location: location,
    timeStart: timeStart,
    userId: userId,
  });
  checkinRecord
    .save()
    .then(() => {
      return User.updateOne({ _id: userId }, { isWorking: true });
    })
    .then(() => {
      console.log("Checked In!");
      res.redirect("/working");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCheckout = (req, res, next) => {
  Checkin.find({ userId: req.user._id })
    .then((checkin) => {
      const location = checkin[0].location;
      const userId = checkin[0].userId;
      const timeStart = checkin[0].timeStart;
      const timeEnd = new Date();
      const checkoutRecord = new Checkout({
        userId: userId,
        location: location,
        timeStart: timeStart,
        timeEnd: timeEnd,
      });
      return checkoutRecord.saveToOT();
    })
    .then(() => {
      return Checkin.deleteMany({ userId: req.user._id });
    })
    .then(() => {
      return User.updateOne({ _id: req.user._id }, { isWorking: false });
    })
    .then(() => {
      console.log("Checkout!");
      res.redirect("/working");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAnnualLeave = (req, res, next) => {
  const userId = req.user._id;
  let date = new Date();
  if (req.body.date) {
    date = req.body.date;
  }
  const hours = req.body.hours;
  const reason = req.body.reason;
  const newAnnualLeaveRegistered = new AnnualLeave({
    userId: userId,
    date: date,
    hours: hours,
    reason: reason,
  });
  newAnnualLeaveRegistered
    .save()
    .then(() => {
      return User.updateOne(
        { _id: userId },
        { annualLeave: req.user.annualLeave - hours / 8 }
      );
    })
    .then(() => {
      console.log("Annual Leave Was Registered!");
      res.redirect("/working");
    })
    .catch((err) => {
      console.log(err);
    });
};
