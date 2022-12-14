import React from "react";
import Axios from "axios";
import Toast from "../../Toast";
import ToastUtils from "../../../utils/ToastUtils";
import LoadingPage from "../../../utils/LoadingPage";
export default function ManagerTheaterRoom() {
  const [loading, setLoading] = React.useState(true);
  const [checked, setChecked] = React.useState("");
  const [textToast, setTextToast] = React.useState("");

  const [idTheater, setIdTheater] = React.useState("");
  const [listOfTheater, setListOfTheater] = React.useState([]);
  const [newTheater, setNewTheater] = React.useState({
    name: "",
    address: "",
    describe: "",
    room: [],
  });

  //Get All Theater
  React.useEffect(() => {
    Axios.get(process.env.REACT_APP_API + "/admin/getAllTheater").then(
      (response) => {
        setListOfTheater(response.data);
        setLoading(false);
      }
    );
  }, [checked]);

  const handleChange = (e) => {
    setNewTheater({ ...newTheater, [e.target.name]: e.target.value });
  };
  const CheckSymbolToArray = (str) => {
    var arr = [];
    if (str.includes(",")) {
      arr = str.split(",");
      arr = arr.map((item) => item.trim());
      return arr;
    }
    return null;
  };
  const Add = (e) => {
    e.preventDefault();
    var arrRoom = CheckSymbolToArray(
      document.getElementsByClassName("check-name")[0].value
    );
    if (arrRoom) {
      setLoading(true);
      arrRoom = arrRoom.filter((item) => item !== "");
      Axios.post(process.env.REACT_APP_API + "/admin/addTheaterAndRoom", {
        name: newTheater.name,
        address: newTheater.address,
        describe: newTheater.describe,
        room: arrRoom,
      })
        .then(function (response) {
          setLoading(false);
          setTimeout(() => {
            setNewTheater({ name: "", address: "", describe: "", room: [] });
            setChecked(newTheater.name);
            setTextToast("Đã thêm rạp chiếu phim mới");
            ToastUtils("success");
          }, 500);
        })
        .catch(function (error) {
          setLoading(false);
          setTimeout(() => {
            setTextToast(error.response.data);
            ToastUtils("fail");
          }, 500);
        });
    } else {
      setTextToast("Tên phòng phải bao gồm ký tự ','");
      ToastUtils("fail");
    }
  };

  const handleDelete = (e) => {
    setLoading(true);
    Axios.put(
      `${process.env.REACT_APP_API}/admin/deleteTheaterById/${idTheater}`
    )
      .then(function (response) {
        setChecked(Math.random());
        setLoading(false);
        setTimeout(() => {
          setTextToast("Đã xoá thành công");
          ToastUtils("success");
        }, 500);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const getTheater = (id) => {
    setIdTheater(id);
    const newTheater = listOfTheater.filter((item) => item._id === id);
    setNewTheater(newTheater[0]);
  };
  const Update = (e) => {
    e.preventDefault();
    var arrRoom = CheckSymbolToArray(
      document.getElementsByClassName("check-name")[0].value
    );
    if (arrRoom) {
      document.getElementById("btn-close").click();
      setLoading(true);
      arrRoom = arrRoom.filter((item) => item !== "");
      Axios.put(
        `${process.env.REACT_APP_API}/admin/updateTheaterById/${idTheater}`,
        {
          name: newTheater.name,
          address: newTheater.address,
          describe: newTheater.describe,
          room: arrRoom,
        }
      )
        .then(function (response) {
          setNewTheater({ name: "", address: "", describe: "", room: [] });
          setChecked(Math.random());
          setLoading(false);
          setTimeout(() => {
            setTextToast("Đã cập nhật thông tin rạp chiếu.");
            ToastUtils("success");
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setTextToast("Tên phòng phải bao gồm ký tự ','");
      ToastUtils("fail");
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="bg-light p-4">
          <div className="row">
            <div className="col-md-7">
              <h3 className="text-center text-success mt-2">
                CÁC RẠP ĐANG CÓ TRONG HỆ THỐNG VOSTRO CINEMA
              </h3>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="table__header" scope="col">
                      #
                    </th>
                    <th className="table__header" scope="col">
                      Tên rạp
                    </th>
                    <th className="table__header" scope="col">
                      Địa chỉ
                    </th>
                    <th className="table__header" scope="col">
                      Mô tả
                    </th>
                    <th className="table__header" scope="col">
                      Phòng
                    </th>
                    <th className="table__header" scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {listOfTheater.map((item, index) => {
                    return (
                      <tr className="table__row" key={item._id}>
                        <th>{index + 1}</th>
                        <td style={{ maxWidth: "100px" }}>{item.name}</td>
                        <td style={{ maxWidth: "100px" }}>{item.address}</td>
                        <td style={{ maxWidth: "100px" }}>{item.describe}</td>
                        <td style={{ maxWidth: "100px" }}>
                          {item.room.toString()}
                        </td>
                        <td style={{ maxWidth: "30px" }}>
                          <button
                            className="btn border-light"
                            data-bs-toggle="modal"
                            onClick={(e) => getTheater(item._id)}
                            data-bs-target="#update"
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </button>
                          <button
                            className="btn border-light"
                            data-bs-toggle="modal"
                            data-bs-target="#delete"
                            onClick={(e) => setIdTheater(item._id)}
                          >
                            <i className="fa-solid fa-trash-can text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-md-5">
              <h3 className="text-center text-success mt-2">THÊM RẠP PHIM</h3>
              <div>
                <form style={{ margin: "0 auto" }} onSubmit={(e) => Add(e)}>
                  <div className="mb-3">
                    <label className="form-label">Tên rạp phim:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newTheater.name}
                      required
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Địa chỉ:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTheater.address}
                      name="address"
                      required
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mô tả:</label>
                    <input
                      type="text"
                      value={newTheater.describe}
                      className="form-control"
                      name="describe"
                      required
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tên phòng:</label>
                    <input
                      value={newTheater.room}
                      type="text"
                      className="form-control check-name"
                      name="room"
                      required
                      onChange={(e) => handleChange(e)}
                    ></input>
                    <div className="form-text">
                      Cách nhập: P1,P2 (Tức là có 2 phòng: P1 và P2)
                    </div>
                  </div>
                  <div
                    className="w-75 mt-3 d-flex justify-content-center"
                    style={{ margin: "0 auto" }}
                  >
                    <button
                      type="submit"
                      className="btn mx-1 w-75 btn-primary edit-info"
                    >
                      Thêm
                    </button>
                    <button
                      type="submit"
                      className="btn mx-1 w-75 btn-success update-info d-none"
                    >
                      Cập nhật
                    </button>
                  </div>
                </form>

                {/* Modal delete */}
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
                          Xoá rạp chiếu
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Rạp chiếu này và các phòng trong rạp chiếu sẽ bị khoá
                        vĩnh viễn và không thể khôi phục
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
                          onClick={(e) => handleDelete(e)}
                        >
                          Tôi chắn chắn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal update */}
                <form onSubmit={(e) => Update(e)}>
                  <div
                    className="modal fade"
                    id="update"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="updateLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="updateLabel">
                            CHỈNH SỬA THÔNG TIN
                          </h5>
                          <button
                            id="btn-close"
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label className="form-label">Tên rạp phim</label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              name="name"
                              value={newTheater.name}
                              onChange={(e) => handleChange(e)}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Địa chỉ</label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              name="address"
                              value={newTheater.address}
                              onChange={(e) => handleChange(e)}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Mô tả:</label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              name="describe"
                              value={newTheater.describe}
                              onChange={(e) => handleChange(e)}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Tên phòng:</label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              name="room"
                              value={newTheater.room}
                              onChange={(e) => handleChange(e)}
                            ></input>
                            <div className="form-text">
                              Cách nhập: P1@P2 = P1,P2
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <div>
                            <button
                              type="button"
                              className="btn btn-outline-secondary me-2"
                              data-bs-dismiss="modal"
                            >
                              Huỷ
                            </button>
                            <button
                              type="submit"
                              className="btn btn-outline-success"
                            >
                              Cập nhật
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
