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
  overTime: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});
checkoutSchema.methods.saveToOT = function () {
  return this.model("Checkout")
    .find({ timeStart: userId })
    .then((checkout) => {});
};
module.exports = mongoose.model("Checkout", checkoutSchema);
