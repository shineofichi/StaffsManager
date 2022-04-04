const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checkinSchema = new Schema({
  timeStart: {
    type: Schema.Types.Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Checkin", checkinSchema);
