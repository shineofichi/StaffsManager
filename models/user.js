const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  doB: {
    type: Date,
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
  },
  annualLeave: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  vaccineInfo: {
    type: Schema.Types.ObjectId,
    ref: "Vaccine",
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
