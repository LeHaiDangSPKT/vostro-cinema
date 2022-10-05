const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Theater = new Schema(
  {
    name: { type: String },
    address: { type: String },
    describe: { type: String },
    room: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("theater", Theater);
