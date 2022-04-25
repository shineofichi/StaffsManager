const mongoose = require("mongoose");
const WORKING_TIME_IN_LAW = require("../utils/config").WORKING_TIME_IN_LAW;
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
  const start = new Date(
    this.timeStart.getFullYear(),
    this.timeStart.getMonth(),
    this.timeStart.getDate()
  );
  const end = new Date(
    this.timeStart.getFullYear(),
    this.timeStart.getMonth(),
    this.timeStart.getDate() + 1
  );
  return this.model("Checkout")
    .find({ userId: this.userId, timeStart: { $gte: start, $lte: end } })
    .then((checkout) => {
      let sumTimeInMiliSecond = 0;
      for (let index = 0; index < checkout.length; index++) {
        const element = checkout[index];
        sumTimeInMiliSecond =
          sumTimeInMiliSecond + (element.timeEnd - element.timeStart);
      }
      const sumTime = sumTimeInMiliSecond / 3600000;
      const workTime = (this.timeEnd - this.timeStart) / 3600000;
      if (sumTime > WORKING_TIME_IN_LAW) {
        this.overTime = workTime;
      } else if (
        sumTime < WORKING_TIME_IN_LAW &&
        sumTime + workTime > WORKING_TIME_IN_LAW
      ) {
        this.overTime = sumTime + workTime - WORKING_TIME_IN_LAW;
      } else {
        this.overTime = 0;
      }
      return this.save();
    });
};
module.exports = mongoose.model("Checkout", checkoutSchema);
