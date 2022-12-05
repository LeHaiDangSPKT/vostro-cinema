import React from "react";
import Toast from "../Toast";
import $ from "jquery";
import Axios from "axios";
import LoadingPage from "../../utils/LoadingPage";

export default function ManagerInfo() {
  const [info, setInfo] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_API}/user/findUserById/${localStorage.getItem(
        "id"
      )}`
    ).then((response) => {
      setInfo(response.data);
      setLoading(false);
    });
  }, []);
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
      //Bấm cập nhật
      $(".edit-info")[0].removeAttribute("disabled");
      $(".update-info")[0].classList.add("d-none");
      for (var i = 0; i < input.length; i++) {
        input[i].setAttribute("disabled", "");
      }
      Axios.put(
        `${
          process.env.REACT_APP_API
        }/user/updateUserById/${localStorage.getItem("id")}`,
        {
          dateOfBirthday: info.dateOfBirthday,
          name: info.name,
          password: info.password,
          phoneNumber: info.phoneNumber,
        }
      ).then((response) => {
        localStorage.setItem("name", info.name);
      });
    }
  };
  console.log(info);
  const DeleteAccount = () => {
    Axios.put(
      `${process.env.REACT_APP_API}/user/deleteAccount/${localStorage.getItem(
        "id"
      )}`
    ).then((response) => {
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      window.location.href = "/";
    });
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  try {
    return (
      <>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="bg-light">
            <form
              className="row g-3 w-75 pt-4"
              style={{ margin: "0 auto" }}
              onSubmit={(e) => {
                EditInfo("update-info", e);
              }}
            >
              <h3 className="text-center text-success mt-2">
                THÔNG TIN CỦA BẠN
              </h3>
              <div className="col-md-6">
                <label className="form-label">Họ và tên:</label>
                <input
                  type="text"
                  className=" form-control"
                  id="manager-fullname"
                  required
                  disabled
                  value={info.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
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
                  value={info.dateOfBirthday.slice(0, 10)}
                  name="dateOfBirthday"
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="col-6">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  className="form-control "
                  value={info.email}
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
                  value={info.phoneNumber}
                  name="phoneNumber"
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="col-md-6">
                <label className="form-label">Tên tài khoản:</label>
                <input
                  type="text"
                  className="form-control "
                  value={info.username}
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
                  value={info.password}
                  required
                  disabled
                  name="password"
                  onChange={(e) => handleChange(e)}
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
              className="modal fade"
              id="delete"
              tabIndex="-1"
              aria-labelledby="deleteLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="deleteLabel">
                      Xoá tài khoản
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Tài khoản của bạn sẽ bị khoá vĩnh viễn và không thể khôi
                    phục
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Huỷ
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={DeleteAccount}
                    >
                      Tôi chắn chắn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
