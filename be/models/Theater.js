const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Theater = new Schema(
  {
    Name: { type: String },
    Address: { type: String },
    Describe: { type: String },
    Room: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("theater", Theater);
