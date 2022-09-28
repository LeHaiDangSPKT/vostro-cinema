import React from "react";

export default function History() {
  return (
    <div className="bg-light w-75 rounded-2" style={{ margin: "0 auto" }}>
      <div className="p-4">
        <h3 className="text-center text-success mt-2">
          Lịch sử giao dịch của bạn
        </h3>
        <table className="table text-center">
          <thead>
            <tr>
              <th className="table__header" scope="col">
                #
              </th>
              <th className="table__header" scope="col">
                Mã hoá đơn
              </th>
              <th className="table__header" scope="col">
                Tên phim
              </th>
              <th className="table__header" scope="col">
                Giá tiền
              </th>
              <th className="table__header" scope="col">
                Ngày xuất hoá đơn
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
    </div>
  );
}
