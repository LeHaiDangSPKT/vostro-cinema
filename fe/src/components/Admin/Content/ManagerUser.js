import React from "react";
import InfoDetails from "./InfoDetails";
import Axios from "axios";
import Toast from "../../Toast";
import ToastUtils from "../../../utils/ToastUtils";
export default function ManagerUser() {
  const [listOfUsers, setListOfUsers] = React.useState([]);
  const [oneUser, setOneUser] = React.useState({});
  const [textToast, setTextToast] = React.useState("");
  const [checked, setChecked] = React.useState(0);

  React.useEffect(() => {
    Axios.get("http://localhost:5000/admin/getAllUsers").then((response) => {
      setListOfUsers(response.data);
      setOneUser(response.data[0]);
    });
  }, [checked]);
  const Delete = () => {
    console.log(oneUser[0]._id);

    Axios.put(`http://localhost:5000/admin/deleteAccountById/${oneUser[0]._id}`)
      .then(function (response) {
        setChecked(Math.random());
        setTextToast("Đã xoá thành công");
        ToastUtils("success");
      })
      .catch(function (error) {});
  };

  return (
    <div>
      <div className="bg-light rounded-2" style={{ margin: "0 auto" }}>
        <div className="p-4">
          <h3 className="text-center text-success mt-2">
            TẤT CẢ CÁC KHÁCH HÀNG
          </h3>
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
                  {listOfUsers.map((item, index) => {
                    return (
                      <tr
                        className="table__row"
                        key={item._id}
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          setOneUser(
                            listOfUsers.filter((items) => items._id == item._id)
                          )
                        }
                      >
                        <th>{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.email}</td>
                        <td>{item.dateOfBirthday.substring(0, 10)}</td>
                        <td>
                          <button
                            className="btn border-white"
                            data-bs-toggle="modal"
                            data-bs-target="#delete"
                          >
                            <i class="fa-solid fa-trash-can text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-25">
              {oneUser[0] && <InfoDetails oneUser={oneUser[0]} />}
            </div>
          </div>
        </div>
      </div>
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
              Tài khoản này sẽ bị khoá vĩnh viễn và không thể khôi phục
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
  );
}
