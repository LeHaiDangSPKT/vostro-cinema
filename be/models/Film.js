const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Film = new Schema(
  {
    name: { type: String },
    duration: { type: Number },
    startingDay: { type: Date },
    closingDay: { type: Date },
    trailer: { type: String },
    img: { type: String },
    describe: { type: String },
    category: { type: Array, default: [] },
    theaterId: { type: Array, default: [] },
    showtimes: { type: Array, default: [] },
    room: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("film", Film);
