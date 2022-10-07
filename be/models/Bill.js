const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Bill = new Schema(
  {
    MaKhachHang: { type: String },
    MaPhim: { type: String },
    TenPhim: { type: String },
    MaRap: { type: String },
    TenPhong: { type: String },
    SuatChieu: { type: String },
    GiaVe: { type: Number },
    DichVu: [
      {
        TenDichVu: { type: String },
        SoLuong: { type: Number },
      },
    ],
    KhuyenMai: { type: String },
    TongTien: { type: Number },
    ThoiGian: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bill", Bill);
