const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
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
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Checkout", checkoutSchema);
