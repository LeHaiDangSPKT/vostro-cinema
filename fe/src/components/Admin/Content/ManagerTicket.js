import React from "react";

export default function ManagerTicket() {
  return (
    <div className="bg-light">
      <div className="w-75 text-center p-4" style={{ margin: "0 auto" }}>
        <h3 className="text-success">CHỈNH SỬA GIÁ VÉ</h3>
        <div className="row pb-4">
          <div className="col-md-6">
            <i class="fa-solid fa-couch" style={{ fontSize: "200px" }}></i>
            <h3 className="text-success">Giá vé ghế đơn là: 45.000 đồng</h3>
            <div className="d-flex w-50" style={{ margin: "0 auto" }}>
              <input type="text" className="form-control w-50 me-2" />
              <button className="btn btn-success">Cập nhật</button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <i class="fa-solid fa-couch" style={{ fontSize: "200px" }}></i>
              <i
                class="fa-solid fa-couch"
                style={{ fontSize: "200px", transform: "translateX(-60px)" }}
              ></i>
            </div>
            <h3 className="text-success">Giá vé ghế đôi là: 95.000 đồng</h3>
            <div className="d-flex w-50" style={{ margin: "0 auto" }}>
              <input type="text" className="form-control w-50 me-2" />
              <button className="btn btn-success">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
