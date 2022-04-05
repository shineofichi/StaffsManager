const Checkin = require("../models/checkin");
const Checkout = require("../models/checkout");
const User = require("../models/user");
const AnnualLeave = require("../models/anuualLeave");
const user = require("../models/user");

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
      return User.updateOne({ _id: userId }, { isWorking: true });
    })
    .then(() => {
      console.log("Checked In!");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/working/checkout");
};

exports.getCheckoutPage = (req, res, next) => {
  Checkin.find({ userId: req.user._id })
    .then((checkin) => {
      const timeStart = checkin[0].timeStart;
      const location = checkin[0].location;
      res.render("working/checkout", {
        pageTitle: "Kết thúc điểm danh",
        path: "/working",
        user: {
          name: req.user.name,
          isWorking: req.user.isWorking,
        },
        timeRecord: {
          timeStart: timeStart,
          location: location,
        },
      });
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
      return User.updateOne({ _id: req.user._id }, { isWorking: false });
    })
    .then(() => {
      console.log("Checkout!");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/working/checkin");
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

exports.postAnnualLeave = (req, res, next) => {
  const userId = req.user._id;
  const date = req.body.date;
  const hours = req.body.hours;
  const reason = req.body.reason;
  User.find({ _id: userId })
    .then((user) => {
      if (user.annualLeave < hours) {
        return [];
      } else {
        return user;
      }
    })
    .then((user) => {
      if (user) {
        const newAnnualLeaveRegistered = new AnnualLeave({
          userId: userId,
          date: date,
          hours: hours,
          reason: reason,
        });
        return newAnnualLeaveRegistered.save();
      } else {
        throw "Error";
      }
    })
    .then(() => {
      res.redirect("/working/annualleave");
    })
    .catch((err) => {
      console.log(err);
    });
};
