const path = require("path");

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("624307680f7d83ea44c7104d")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", user);
app.use(homeRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://anhtt:agzwSoCXtFOQfLui@cluster0.0fvan.mongodb.net/staff-manager?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "AnhTT",
          email: "anhttFX13476@funix.edu.vn",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
