import React from "react";

export default function ManagerDashboard() {
  return (
    <div className="bg-light">
      <div className="w-75 p-4" style={{ margin: "0 auto" }}>
        <h3 className="text-center text-success mb-3 ">THỐNG KÊ DOANH THU</h3>
        <form>
          <div className="row">
            <div className="col-md-5">
              <label>Chọn rạp:</label>
              <select className="form-control" id="type" required>
                <option value="">Choose...</option>
                <option value="">Rap 1</option>
                <option value="">Rap 2</option>
                <option value="">Rap 3</option>
                <option value="">Rap 4</option>
              </select>
            </div>
            <div className="col-md-5">
              <label>Chọn năm:</label>
              <select className="form-control" id="type" required>
                <option value="">Choose...</option>
                <option value="">2021</option>
                <option value="">2022</option>
                <option value="">2023</option>
                <option value="">2024</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-success h-75 w-100 mt-3">Xem</button>
            </div>
          </div>
        </form>
        <div
          className="w-75 mt-4 rounded-4 border border-3 border-danger"
          style={{ margin: "0 auto" }}
        >
          <div className="p-4 text-center text-warning">
            <h3 className="mb-0">Tổng doanh thu: 1.000.000 đồng</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
