const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Promotion = new Schema(
  {
    Name: { type: String },
    Percent: { type: Number },
    StartingDay: { type: Date },
    ClosingDay: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("promotion", Promotion);
