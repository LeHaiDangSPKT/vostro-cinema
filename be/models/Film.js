const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Film = new Schema(
  {
    Name: { type: String },
    Duration: { type: Number },
    StartingDay: { type: Date },
    ClosingDay: { type: Date },
    Trailer: { type: String },
    Img: { type: String },
    Describe: { type: String },
    Category: { type: Array, default: [] },
    Showtimes: { type: Array, default: [] },
    TheaterId: { type: Array, default: [] },
    Room: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("film", Film);
