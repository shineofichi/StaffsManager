const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const annualLeaveSchema = new Schema({
  reason: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.module("AnnualLeave", annualLeaveSchema);
