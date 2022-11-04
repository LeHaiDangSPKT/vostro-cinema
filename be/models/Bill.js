const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Bill = new Schema(
  {
    UserId: { type: String },
    FilmID: { type: String },
    FilmName: { type: String },
    TheaterId: { type: String },
    Showtime: { type: String },
    Price: { type: Number },
    Total: { type: Number },

    RoomName: { type: String },
    Service: [
      {
        Name: { type: String },
        Quantity: { type: Number },
      },
    ],
    Promotion: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bill", Bill);
