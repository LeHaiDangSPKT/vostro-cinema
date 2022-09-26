import * as React from "react";
import Test from "../../imgs/test-2.jpg";
import Popcorn from "../../imgs/popcorn.png";
import Monster from "../../imgs/drink-1.png";
import Pepsi from "../../imgs/drink-2.png";
import Redbull from "../../imgs/drink-3.png";

export default function BookService() {
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
      <div className="w-75 me-4">
        <h3 className="text-center text-success mb-0 ">ĐẶT MÓN</h3>

        <div className="d-flex justify-content-between flex-column ">
          {/* Chọn đồ ăn */}
          <div className="d-flex mt-4">
            <h5 className="me-3 text-center">Chọn đồ ăn</h5>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "280px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioFoodName"
                  id="RadioFoodId"
                ></input>
                <h5 className="text-dark text-center m-0 mt-1">Bắp rang bơ</h5>
                <div className="d-flex justify-content-center ">
                  <img
                    src={Popcorn}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
                <h6 className="text-center bg-light py-2 rounded-2">
                  Giá: 60.000 đồng
                </h6>
                <div className="mt-2">
                  <label className="w-50">Số lượng:</label>
                  <input
                    type="text"
                    className="w-50 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "280px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioFoodName"
                  id="radioFoodId"
                ></input>
                <h5 className="text-dark text-center m-0 mt-1">Bắp Caramel</h5>
                <div className="d-flex justify-content-center ">
                  <img
                    src={Popcorn}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
                <h6 className="text-center bg-light py-2 rounded-2">
                  Giá: 60.000 đồng
                </h6>
                <div className="mt-2">
                  <label className="w-50">Số lượng:</label>
                  <input
                    type="text"
                    className="w-50 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "280px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioFoodName"
                  id="radioFoodId"
                ></input>
                <h5 className="text-dark text-center m-0 mt-1">Bắp phô mai</h5>
                <div className="d-flex justify-content-center ">
                  <img
                    src={Popcorn}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
                <h6 className="text-center bg-light py-2 rounded-2">
                  Giá: 60.000 đồng
                </h6>
                <div className="mt-2">
                  <label className="w-50">Số lượng:</label>
                  <input
                    type="text"
                    className="w-50 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Chọn nước uống */}
          <div className="d-flex mt-4">
            <h5 style={{ marginRight: "22px", textAlign: "center" }}>
              Chọn nước
            </h5>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "280px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioDrinkName"
                  id="radioDrinkId"
                ></input>
                <h5 className="text-dark text-center m-0 mt-1">Monster</h5>
                <div className="d-flex justify-content-center ">
                  <img
                    src={Monster}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
                <h6 className="text-center bg-light py-2 rounded-2">
                  Giá: 40.000 đồng
                </h6>
                <div className="mt-2">
                  <label className="w-50">Số lượng:</label>
                  <input
                    type="text"
                    className="w-50 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "280px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioDrinkName"
                  id="radioDrinkId"
                ></input>
                <h5 className="text-dark text-center m-0 mt-1">Pepsi</h5>
                <div className="d-flex justify-content-center ">
                  <img
                    src={Pepsi}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
                <h6 className="text-center bg-light py-2 rounded-2">
                  Giá: 40.000 đồng
                </h6>
                <div className="mt-2">
                  <label className="w-50">Số lượng:</label>
                  <input
                    type="text"
                    className="w-50 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "280px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="radioDrinkName"
                  id="radioDrinkId"
                ></input>
                <h5 className="text-dark text-center m-0 mt-1">RedBull</h5>
                <div className="d-flex justify-content-center ">
                  <img
                    src={Redbull}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </div>
                <h6 className="text-center bg-light py-2 rounded-2">
                  Giá: 40.000 đồng
                </h6>
                <div className="mt-2">
                  <label className="w-50">Số lượng:</label>
                  <input
                    type="text"
                    className="w-50 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-success w-75 mt-2 d-flex justify-content-center"
          style={{ marginLeft: "137px" }}
          onClick={next}
        >
          Thanh toán
        </button>
        <button
          type="button"
          className="btn btn-success w-75 mt-2 d-flex justify-content-center"
          style={{ marginLeft: "137px" }}
          onClick={prev}
        >
          Quay về
        </button>
      </div>
      <div
        className="d-flex flex-column w-25"
        style={{ margin: "0 auto", marginTop: "55px" }}
      >
        <img src={Test} className="" alt="" />
        <span className="text-center text-light fs-5 bg-danger p-4 rounded-bottom">
          Tổng tiền: 100.000 đồng
        </span>
      </div>
    </div>
  );
}
