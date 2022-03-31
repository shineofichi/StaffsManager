const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// const errorController = require("./controllers/error");
// const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const userRoutes = require("./routes/user");
const homeRoutes = require("./routes/home");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  next();
});

app.use("/user", userRoutes);
app.use(homeRoutes);

app.listen(3000);
