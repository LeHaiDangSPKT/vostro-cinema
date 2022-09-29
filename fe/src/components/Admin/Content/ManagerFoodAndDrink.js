import React from "react";
import Popcorn from "../../../imgs/popcorn.png";
import Monster from "../../../imgs/drink-1.png";
import Pepsi from "../../../imgs/drink-2.png";
import Redbull from "../../../imgs/drink-3.png";
import $ from "jquery";
import Toast from "../../Toast";
import * as bootstrap from "bootstrap";
export default function ManagerFoodAndDrink() {
  const UpdateSuccess = () => {
    window.bootstrap = bootstrap;
    const toastLiveExample = $("#update");
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  };
  const EditInfo = (className, e) => {
    e.preventDefault();
    var input = $("input[id*='manager']");
    if (className === "edit-info") {
      $(".edit-info")[0].setAttribute("disabled", "");
      $(".update-info")[0].classList.remove("d-none");
      for (var i = 0; i < input.length; i++) {
        input[i].removeAttribute("disabled");
      }
      input[0].removeAttribute("disabled");
    } else {
      $(".edit-info")[0].removeAttribute("disabled");
      $(".update-info")[0].classList.add("d-none");
      for (var i = 0; i < input.length; i++) {
        input[i].setAttribute("disabled", "");
      }
      UpdateSuccess();
    }
  };
  return (
    <div className="bg-light">
      <div className="w-75 p-4" style={{ margin: "0 auto" }}>
        <h3 className="text-center text-success mb-0 ">
          QUẢN LÝ ĐỒ ĂN VÀ NƯỚC UỐNG
        </h3>

        <div className="d-flex justify-content-between flex-column ">
          {/* Chọn đồ ăn */}
          <div className="d-flex mt-4">
            <h5 className="me-3 text-center">Các loại đồ ăn: </h5>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "250px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
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
                <div className="mt-2">
                  <label className="">Giá tiền:</label>
                  <input
                    id="manager-baprangbo"
                    disabled
                    value="40.000"
                    type="text"
                    className="ms-2 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "250px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
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
                <div className="mt-2">
                  <label className="">Giá tiền:</label>
                  <input
                    id="manager-bapcaramel"
                    disabled
                    value="40.000"
                    type="text"
                    className="ms-2 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "250px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
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
                <div className="mt-2">
                  <label className="">Giá tiền:</label>
                  <input
                    id="manager-bapphomai"
                    disabled
                    value="40.000"
                    type="text"
                    className="ms-2 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Chọn nước uống */}
          <div className="d-flex mt-4">
            <h5 style={{ marginRight: "22px", textAlign: "center" }}>
              Các loại nước:
            </h5>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "250px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
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
                <div className="mt-2">
                  <label className="">Giá tiền:</label>
                  <input
                    id="manager-monster"
                    disabled
                    value="40.000"
                    type="text"
                    className="ms-2 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "250px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
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
                <div className="mt-2">
                  <label className="">Giá tiền:</label>
                  <input
                    id="manager-pepsi"
                    disabled
                    value="40.000"
                    type="text"
                    className="ms-2 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between mx-1"
              style={{ height: "250px" }}
            >
              <div className="bg-warning py-1 px-3 rounded-3">
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
                <div className="mt-2">
                  <label className="">Giá tiền:</label>
                  <input
                    id="manager-redbull"
                    disabled
                    value="40.000"
                    type="text"
                    className="ms-2 border rounded-2 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-75 mt-3 d-flex justify-content-center"
          style={{ margin: "0 auto", transform: "translateX(50px)" }}
        >
          <button
            type="button"
            className="btn mx-1 w-75 btn-primary edit-info"
            onClick={(e) => EditInfo("edit-info", e)}
          >
            Sửa thông tin
          </button>
          <button
            type="submit"
            className="btn mx-1 w-75 btn-success update-info d-none"
            onClick={(e) => {
              EditInfo("update-info", e);
            }}
          >
            Cập nhật
          </button>
        </div>
      </div>
      <Toast text="Cập nhật thành công" bg="bg-success" id="update" />
    </div>
  );
}
