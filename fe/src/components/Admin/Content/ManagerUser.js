import React from "react";
import Axios from "axios";
import Toast from "../../Toast";
import ToastUtils from "../../../utils/ToastUtils";
import ReserveString from "../../../utils/ReserveString";
import LoadingPage from "../../../utils/LoadingPage";
import ExportExcel from "../../../utils/ExportExcel";

export default function ManagerUser() {
  const [pageLoading, setPageLoading] = React.useState(true);
  const [listOfUsers, setListOfUsers] = React.useState([]);
  const [oneUser, setOneUser] = React.useState({});
  const [textToast, setTextToast] = React.useState("");
  const [checked, setChecked] = React.useState(0);

  React.useEffect(() => {
    Axios.get(process.env.REACT_APP_API + "/admin/getAllUsers").then(
      (response) => {
        setListOfUsers(response.data);
        setOneUser(response.data[0]);
        setPageLoading(false);
      }
    );
  }, [checked]);
  console.log(oneUser);
  const Delete = () => {
    Axios.put(
      `${process.env.REACT_APP_API}/admin/deleteAccountById/${oneUser._id}`
    )
      .then(function (response) {
        setChecked(Math.random());
        setTextToast("Đã xoá thành công");
        ToastUtils("success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleExportExcel = () => {
    ExportExcel.exportExcel(listOfUsers, "Danh sách người dùng", "UserList");
  };
  return (
    <>
      {pageLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="bg-light rounded-2" style={{ margin: "0 auto" }}>
            <div className="p-4">
              <h3 className="text-center text-success mt-2">
                TẤT CẢ CÁC KHÁCH HÀNG
              </h3>
              <button
                onClick={handleExportExcel}
                className="btn btn-success btn-rounded w-25 mx-auto mb-3"
              >
                {" "}
                <i className="fa-solid fa-file-excel me-2"></i>
                Xuất file Excel
              </button>
              <div className="d-flex mt-4">
                <div className="w-75">
                  <table className="table text-center table-hover">
                    <thead>
                      <tr>
                        <th className="table__header" scope="col">
                          #
                        </th>

                        <th className="table__header" scope="col">
                          Tên khách hàng
                        </th>
                        <th className="table__header" scope="col">
                          Số điện thoại
                        </th>
                        <th className="table__header" scope="col">
                          Email
                        </th>
                        <th className="table__header" scope="col">
                          Ngày sinh
                        </th>
                        <th className="table__header" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {listOfUsers &&
                        listOfUsers.map((item, index) => {
                          if (item.name !== undefined) {
                            return (
                              <tr
                                className="table__row"
                                key={item._id}
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  setOneUser(
                                    listOfUsers.filter(
                                      (items) => items._id == item._id
                                    )[0]
                                  )
                                }
                              >
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber || "Đang cập nhập"}</td>
                                <td>{item.email}</td>
                                <td>
                                  {item.dateOfBirthday
                                    ? ReserveString(
                                        item.dateOfBirthday.substring(0, 10)
                                      )
                                    : "Đang cập nhập"}
                                </td>
                                <td>
                                  <button
                                    className="btn border-white"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete"
                                  >
                                    <i className="fa-solid fa-trash-can text-danger"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="w-25">
                  {oneUser.createdAt && (
                    <div className="bg-secondary rounded-4 bg-opacity-50 ms-2">
                      <div className="text-center text-dark p-2">
                        <i className="fa-solid fa-user fs-1 p-3 bg-success rounded-5"></i>
                        <h4 className="mt-3">{oneUser.name}</h4>
                        <div className="text-start">
                          <div className="my-3">
                            <span className="fw-bold mx-1 ">
                              Mã khách hàng:
                              <span className="fw-normal ms-1">
                                {oneUser._id}
                              </span>
                            </span>
                          </div>
                          <div className="my-3">
                            <span className="fw-bold mx-1 ">
                              Tên khách hàng:{" "}
                              <span className="fw-normal">{oneUser.name}</span>
                            </span>
                          </div>
                          <div className="my-3">
                            <span className="fw-bold mx-1 ">
                              Ngày sinh:{" "}
                              <span className="fw-normal">
                                {oneUser.dateOfBirthday
                                  ? oneUser.dateOfBirthday.substring(0, 10)
                                  : "Đang cập nhập"}
                              </span>
                            </span>
                          </div>
                          <div className="my-3">
                            <span className="fw-bold mx-1 ">
                              Số điện thoại:{" "}
                              <span className="fw-normal">
                                {oneUser.phoneNumber || "Đang cập nhập"}
                              </span>
                            </span>
                          </div>
                          <div className="my-3">
                            <span className="fw-bold mx-1 ">
                              Email:{" "}
                              <span className="fw-normal">{oneUser.email}</span>
                            </span>
                          </div>
                          {oneUser.dateOfBirthday && (
                            <>
                              <div className="my-3">
                                <span className="fw-bold mx-1 ">
                                  Tài khoản:{" "}
                                  <span className="fw-normal">
                                    {oneUser.username}
                                  </span>
                                </span>
                              </div>
                              <div className="my-3">
                                <span className="fw-bold mx-1 ">
                                  Mật khẩu:{" "}
                                  <span className="fw-normal">
                                    {oneUser.password}
                                  </span>
                                </span>
                              </div>
                            </>
                          )}

                          <div className="my-3">
                            <span className="fw-bold mx-1 ">
                              Ngày tạo:{" "}
                              <span className="fw-normal">
                                {oneUser.createdAt.substring(0, 10)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
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
                  Tài khoản này sẽ bị khoá vĩnh viễn và không thể khôi phục
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
                    onClick={(e) => Delete()}
                  >
                    Tôi chắn chắn
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Toast text={textToast} bg="bg-danger" id="fail" />
          <Toast text={textToast} bg="bg-success" id="success" />
        </div>
      )}
    </>
  );
}
