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
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("AnnualLeave", annualLeaveSchema);
