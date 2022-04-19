const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat").dateFormat;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  doB: {
    type: Date,
    transform: (y) => dateFormat(y)[0],
    required: true,
  },
  department: {
    type: String,
  },
  salaryScale: {
    type: Number,
    default: 1.0,
  },
  startDate: {
    type: Date,
    transform: (y) => dateFormat(y)[0],
  },
  annualLeave: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isWorking: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCovid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
