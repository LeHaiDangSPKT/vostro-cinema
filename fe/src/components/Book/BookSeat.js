import * as React from "react";
import Test from "../../imgs/test-2.jpg";
import $ from "jquery";

export default function BookSeat() {
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

  const ChangeColor = (e) => {
    e.target.classList.toggle("border-bottom-seat");
  };

  return (
    <div className="bg-light rounded-3 p-4 mt-4 d-flex justify-content-between book">
      <div className="w-75 me-4" style={{ margin: "0 auto" }}>
        <h3 className="text-center text-success mb-0 ">CHỌN GHẾ</h3>
        <h4 className="text-center text-light mb-0 mt-3 py-2 bg-dark border rounded-3">
          MÀN HÌNH
        </h4>
        <div className="d-flex justify-content-between mt-3">
          <span className="text-center">
            Lối vào<i class="fa-solid fa-arrow-down"></i>
          </span>
          <ul className="seat">
            <li onClick={(e) => ChangeColor(e)}>1</li>
            <li onClick={(e) => ChangeColor(e)}>2</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li className="double-seat">4</li>
            <li className="double-seat">4</li>
            <li className="double-seat">4</li>
            <li className="double-seat">4</li>
            <li className="double-seat">4</li>
          </ul>
        </div>
        <div style={{ marginLeft: "35px", marginBottom: "10px" }}>
          <label className="fw-bold fs-5">Ghi chú:</label>
          <div className="d-flex justify-content-center">
            <div className="mx-2 border-success border-3 border-bottom p-2 rounded-2">
              Ghế đơn
            </div>
            <div className="mx-2 border-danger border-3 border-bottom p-2 rounded-2">
              Ghế đôi
            </div>
            <div className="mx-2 border-warning border-3 border-bottom p-2 rounded-2">
              Ghế đã chọn
            </div>
            <div className="mx-2 border-info border-3 border-bottom p-2 rounded-2">
              Ghế đã đặt
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-success w-75 d-flex justify-content-center"
          style={{ margin: "0 auto" }}
          onClick={next}
        >
          Tiếp tục
        </button>
        <button
          type="button"
          className="btn btn-success w-75 mt-2 d-flex justify-content-center"
          style={{ margin: "0 auto" }}
          onClick={prev}
        >
          Quay về
        </button>
      </div>
      <div
        className="d-flex flex-column w-25"
        style={{ margin: "0 auto", marginTop: "50px" }}
      >
        <img src={Test} className="" alt="" />
        <span className="text-center text-light fs-5 bg-danger p-4 rounded-bottom">
          Tổng tiền: 100.000 đồng
        </span>
      </div>
    </div>
  );
}
