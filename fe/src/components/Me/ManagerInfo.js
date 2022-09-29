import React from "react";
import Toast from "../Toast";
import * as bootstrap from "bootstrap";
import $ from "jquery";
export default function ManagerInfo() {
  // const [value, setValue] = React.useState("Lê Hải Đăng");
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
      <form className="row g-3 w-75 pt-4" style={{ margin: "0 auto" }}>
        <h3 className="text-center text-success mt-2">THÔNG TIN CỦA BẠN</h3>
        <div className="col-md-6">
          <label className="form-label">Họ và tên:</label>
          <input
            type="text"
            className=" form-control"
            id="manager-fullname"
            required
            disabled
            value="Lê Hải Đăng"
            // onChange={(e) => setValue(e.target.value)}
          ></input>
        </div>
        <div className="col-md-6">
          <label className="form-label">Ngày tháng năm sinh:</label>
          <input
            type="date"
            className=" form-control"
            id="manager-dob"
            required
            disabled
            // onChange={(e) => console.log(e.target.value)}
            value="2022-10-08"
          ></input>
        </div>
        <div className="col-6">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control "
            id="manager-email"
            value="haidanmanager-g@gmail.com"
            required
            disabled
          ></input>
        </div>
        <div className="col-6">
          <label className="form-label">Số điện thoại:</label>
          <input
            type="tel"
            className=" form-control"
            id="manager-phone"
            required
            disabled
            minLength="10"
            value="0868366694"
          ></input>
        </div>
        <div className="col-md-6">
          <label className="form-label">Tên tài khoản:</label>
          <input
            type="text"
            className="form-control "
            id="manager-username-signin"
            value="username1"
            required
            disabled
          ></input>
        </div>
        <div className="col-md-6">
          <label className="form-label">Mật khẩu:</label>
          <input
            type="text"
            className="form-control "
            id="manager-password-signin"
            value="passwprd1"
            required
            disabled
          ></input>
        </div>
        <div
          className="w-75 mt-3 d-flex justify-content-center"
          style={{ margin: "0 auto" }}
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
          <button
            type="button"
            className="btn mx-1 w-75 btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#delete"
          >
            Xoá tài khoản
          </button>
        </div>
      </form>
      <div className="row w-75 pb-4" style={{ margin: "0 auto" }}>
        <div
          className="w-75 mt-3 d-flex justify-content-center"
          style={{ margin: "0 auto" }}
        >
          <button
            type="button"
            className="btn mx-1 w-75 btn-warning"
            onClick={(e) => window.open("/me/history")}
          >
            Xem lại lịch sử giao dịch
          </button>
        </div>
      </div>
      <Toast text="Cập nhật thành công" bg="bg-success" id="update" />

      {/* Modal Delte */}
      <div
        class="modal fade"
        id="delete"
        tabindex="-1"
        aria-labelledby="deleteLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteLabel">
                Xoá tài khoản
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Tài khoản của bạn sẽ bị khoá vĩnh viễn và không thể khôi phục
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Huỷ
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Tôi chắn chắn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
