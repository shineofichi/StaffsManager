const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const covidSchema = new Schema({
  temp: {
    required: true,
    type: Number,
  },
  time: {
    type: Date,
    required: true,
  },
  isCovid: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.module("Covid", covidSchema);
