import * as React from "react";
import Test from "../../imgs/test-2.jpg";

export default function BookTicket() {
  const next = () => {
    const collection = document.getElementsByClassName("slick-next");
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].parentNode.outerHTML.includes("book")) {
        collection[i].click(function () {});
      }
    }
  };

  const prev = () => {
    const collection = document.getElementsByClassName("slick-prev");
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].parentNode.outerHTML.includes("book")) {
        collection[i].click(function () {});
      }
    }
  };

  return (
    <div className="bg-light rounded-3 p-4 mt-4 d-flex justify-content-between book">
      <div className="w-75 me-4" style={{ margin: "0 auto" }}>
        <h3 className="text-center text-success mb-0 ">
          ĐẶT VÉ NGAY BẠN YÊU ƠI
        </h3>
        <div className="mb-3">
          <label className="form-label">Chọn phim:</label>
          <select class="form-control" id="film">
            <option value="">Choose..</option>
            <option value="">Phim 1</option>
            <option value="">Phim 1</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Chọn rạp:</label>
          <select className="form-control" id="place">
            <option value="">Choose...</option>
            <option value="">Nơi 1</option>
            <option value="">Nơi 2</option>
            <option value="">Nơi 3</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Chọn ngày:</label>
          <select className="form-control" id="day">
            <option value="">Choose...</option>
            <option value="">Nơi 1</option>
            <option value="">Nơi 2</option>
            <option value="">Nơi 3</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Chọn suất chiếu:</label>
          <select className="form-control" id="showtime">
            <option value="">Choose...</option>
            <option value="">Nơi 1</option>
            <option value="">Nơi 2</option>
            <option value="">Nơi 3</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-success w-75 d-flex justify-content-center"
          style={{ margin: "0 auto" }}
          onClick={next}
        >
          Đặt vé
        </button>
      </div>
      <div
        className="d-flex flex-column w-25"
        style={{ margin: "0 auto", marginTop: "40px" }}
      >
        <img src={Test} className="" alt="" />
        <span className="text-center text-light fs-5 bg-danger p-4 rounded-bottom">
          Tổng tiền: 100.000 đồng
        </span>
      </div>
    </div>
  );
}
