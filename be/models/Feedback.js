const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Feedback = new Schema(
  {
    UserId: { type: String },
    Content: { type: String },
    Mode: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", Feedback);
