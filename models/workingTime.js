const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workingTimeSchema = new Schema({
  timeStart: {
    type: Schema.Types.Date,
    required: true,
  },
  timeEnd: {
    type: Schema.Types.Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isWorking: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("WorkingTime", workingTimeSchema);
