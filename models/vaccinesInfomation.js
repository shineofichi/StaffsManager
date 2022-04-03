const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vaccineSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  times: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Vaccine", vaccineSchema);
