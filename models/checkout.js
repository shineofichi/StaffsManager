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
checkoutSchema.methods.getSumaryTime = function () {
  const workingTime = this.timeEnd - this.timeStart;
  const workingHour = workingTime / 360000;
  return workingHour;
};
module.exports = mongoose.model("Checkout", checkoutSchema);
