const User = require("../models/user");
const TempReport = require("../models/tempReport");
const Vaccine = require("../models/vaccinesInfomation");
const Checkout = require("../models/checkout");
const dateFormat = require("../utils/dateFormat").dateFormat;
const getDiffDate = require("../utils/dateFormat").getDiffDate;

exports.getUserInfomationPage = (req, res, next) => {
  const userId = req.user._id;
  User.find({ _id: userId })
    .then((user) => {
      const doBFormat = dateFormat(user[0].doB)[0];
      const startDateFormat = dateFormat(user[0].startDate)[0];
      const formatData = {
        ...user[0]._doc,
        doB: doBFormat,
        startDate: startDateFormat,
      };
      return formatData;
    })
    .then((user) => {
      res.render("userInfomation", {
        pageTitle: "Thông tin cá nhân",
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUserInfomationUpdate = (req, res, next) => {
  const updatedUser = {
    name: req.body.name,
    doB: req.body.doB,
    department: req.body.department,
    salaryScale: req.body.salaryScale,
    startDate: req.body.startDate,
    annualLeave: req.body.annualLeave,
    imageUrl: req.body.imageUrl,
  };
  User.updateOne({ _id: req.user._id }, updatedUser)
    .then(() => {
      console.log("Updated Information!");
      res.redirect("/user/information");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getWorkingTimePage = (req, res, next) => {
  res.render("workingTimeSearch/index.ejs", {
    pageTitle: "Tra cứu thông tin giờ làm",
    user: req.user,
  });
};

exports.getWorkingTimeSearchPage = (req, res, next) => {
  const userId = req.user._id;
  Checkout.find({ userId: userId })
    .then((checkout) => {
      const workingData = checkout.map((data) => {
        const addSumaryTime = {
          ...data._doc,
          sumaryTime: getDiffDate(data.timeEnd, data.timeStart),
          timeStart: dateFormat(data.timeStart),
          timeEnd: dateFormat(data.timeEnd),
        };
        return addSumaryTime;
      });
      const workingTimeArray = [];
      for (let index = 0; index < workingData.length; index++) {
        const checkin = workingData[index];
        const date = checkin.timeStart[0];
        workingTimeArray.push({ date: date, working: checkin });
      }
      const days = workingTimeArray.reduce((hash, obj) => {
        if (obj["date"] === undefined) return hash;
        return Object.assign(hash, {
          [obj["date"]]: (hash[obj["date"]] || []).concat(obj["working"]),
        });
      }, []);
      res.render("workingTimeSearch/workingTime.ejs", {
        pageTitle: "Tra cứu thông tin giờ làm",
        user: req.user,
        workingData: days,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSalarySearchPage = (req, res, next) => {
  res.render("workingTimeSearch/salary.ejs", {
    pageTitle: "Tra cứu thông tin giờ làm",
    user: req.user,
  });
};

exports.getCovidPage = (req, res, next) => {
  const userId = req.user._id;
  TempReport.find({ userId: userId })
    .then((tempReport) => {
      const data = tempReport.map((temp) => {
        const formatedDate = dateFormat(temp.time);
        const formatedTemp = {
          ...temp._doc,
          time: formatedDate,
        };
        return formatedTemp;
      });
      return data;
    })
    .then((tempReport) => {
      Vaccine.find({ userId: userId }).then((vaccine) => {
        const data = vaccine.map((vaccine) => {
          const formatedDate = dateFormat(vaccine.date)[0];
          const formatedData = {
            ...vaccine._doc,
            date: formatedDate,
          };
          return formatedData;
        });
        res.render("covid/index.ejs", {
          pageTitle: "Thông tin Covid",
          user: req.user,
          tempReport: tempReport,
          vaccine: data,
        });
      });
    });
};

exports.postTempReport = (req, res, next) => {
  const temp = req.body.temp;
  const time = new Date().getTime();
  const newTempReport = new TempReport({
    temp: temp,
    time: time,
    userId: req.user._id,
  });
  newTempReport
    .save()
    .then(() => {
      console.log("Reported Temp");
      res.redirect("/user/covid");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCovidRegistered = (req, res, next) => {
  const userId = req.body.id;
  User.updateOne({ _id: userId }, { isCovid: true })
    .then(() => {
      console.log("Covid Registered!");
      res.redirect("/user/covid");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postVaccineInformation = (req, res, next) => {
  const date = req.body.date;
  const times = req.body.times;
  const name = req.body.vaccine;
  const newVaccineInfo = new Vaccine({
    date: date,
    times: times,
    name: name,
    userId: req.user._id,
  });
  newVaccineInfo
    .save()
    .then(() => {
      console.log("Send Vaccine Info success!");
      res.redirect("/user/covid");
    })
    .catch((err) => {
      console.log(err);
    });
};
