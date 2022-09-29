import React from "react";
import FilmDetails from "./FilmDetails";
export default function ManagerFilms() {
  return (
    <div className="bg-light p-4">
      <div className="row">
        <div className="col-md-5">
          <h3 className="text-center text-success mt-2">CÁC PHIM ĐANG CÓ</h3>
          Lựa chọn rạp:
          <select className="mx-3 rounded-2">
            <option defaultValue>Choose...</option>
            <option value="">Rạp số 1</option>
            <option value="">Rạp số 2</option>
            <option value="">Rạp số 3</option>
          </select>
          <table className="table text-center">
            <thead>
              <tr>
                <th className="table__header" scope="col">
                  #
                </th>
                <th className="table__header" scope="col">
                  Mã phim
                </th>
                <th className="table__header" scope="col">
                  Tên phim
                </th>
                <th className="table__header" scope="col">
                  Thể loại
                </th>
                <th className="table__header" scope="col">
                  Thời lượng
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="table__row">
                <th>1</th>
                <td>Hai dang</td>
                <td>hai dang</td>
                <td>hai dang</td>
                <td>hai dang</td>
              </tr>
              <tr className="table__row">
                <th>1</th>
                <td>Hai dang</td>
                <td>hai dang</td>
                <td>hai dang</td>
                <td>hai dang</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-7">
          <h3 className="text-center text-success mt-2">THÔNG TIN CHI TIẾT</h3>
          <FilmDetails />
        </div>
      </div>
    </div>
  );
}
