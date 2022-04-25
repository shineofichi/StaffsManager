const path = require("path");
const config = require("./utils/config");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const User = require("./models/user");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");
const homeRoutes = require("./routes/home");
const workingRoutes = require("./routes/working");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("625e094a03d167468ffb1c3b")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/user", userRoutes);
app.use("/working", workingRoutes);
app.use(homeRoutes);

app.use(errorController.get404);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "AnhTT",
          doB: new Date(),
          department: "IT",
          salaryScale: 1.0,
          startDate: new Date(),
          annualLeave: 0,
          imageUrl:
            "https://recenthighlights.com/wp-content/uploads/2022/03/Luffy-Gear-5.jpg",
          vaccineInfo: "a",
          isAdmin: true,
          isWorking: false,
          isCovid: false,
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
