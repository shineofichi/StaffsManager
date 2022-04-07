const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tempReportSchema = new Schema({
  temp: {
    required: true,
    type: Number,
  },
  time: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("TempReport", tempReportSchema);
