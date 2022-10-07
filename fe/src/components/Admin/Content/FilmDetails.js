import React from "react";
import $ from "jquery";
import ToastUtils from "../../../utils/ToastUtils";
import FileBase64 from "react-file-base64";
import Axios from "axios";

export default function FilmDetails(props) {
  const [checked, setChecked] = React.useState(false);
  const [newFilm, setNewFilm] = React.useState({
    name: "",
    duration: 0,
    startingDay: "",
    closingDay: "",
    trailer: "",
    img: "",
    describe: "",
    category: [],
    showtimes: [],
    theaterId: [],
    room: [],
  });
  React.useEffect(() => {
    props.oneFilm[0] && setNewFilm((prev) => (prev = props.oneFilm[0]));
    setChecked(false);
  }, [props.oneFilm]);
  const handleChange = (e) => {
    setNewFilm({ ...newFilm, [e.target.name]: e.target.value });
  };

  const EditInfo = () => {
    var input = $("input[id*='detail']");
    for (var i = 0; i < input.length; i++) {
      input[i].removeAttribute("disabled");
    }
    setChecked(true);
  };
  const Update = (str, e) => {
    if (!str) {
      e.preventDefault();
    }
    setChecked(false);
    var input = $("input[id*='detail']");
    for (var i = 0; i < input.length; i++) {
      input[i].setAttribute("disabled", true);
    }
    if (CheckValidate()) {
      const listTheater = $('input[name="checkItemFilmDetails"]:checked');
      var arrTheater = Object.values(listTheater)
        .map((item) => item.value)
        .filter((item) => item !== undefined);
      var arrCategory = CheckSymbolToArray(newFilm.category.toString());
      if (arrCategory) {
        const id = props.oneFilm[0]._id;
        arrCategory = arrCategory.filter((item) => item !== "");
        Axios.put(`http://localhost:5000/admin/updateFilmById/${id}`, {
          name: newFilm.name,
          duration: newFilm.duration,
          startingDay: newFilm.startingDay,
          closingDay: newFilm.closingDay,
          trailer: newFilm.trailer,
          img: newFilm.img,
          describe: newFilm.describe,
          category: arrCategory,
          showtimes: newFilm.showtimes,
          theaterId: arrTheater,
          room: newFilm.room,
        })
          .then(function (response) {
            props.setTextToast("Đã cập nhật thành công");
            ToastUtils("success");
            props.setCheck(Math.random());
            setChecked(true);
          })
          .catch(function (error) {
            props.setTextToast(error.response.data);
            ToastUtils("fail");
          });
      } else {
        props.setTextToast("Lỗi hệ thống. Vui lòng nhập lại!!!");
        ToastUtils("fail");
      }
    }
  };

  const CheckAll = () => {
    return $("#checkAll").prop("checked")
      ? ($(".check").prop("checked", true),
        setNewFilm({
          ...newFilm,
          theaterId: props.listTheater.map((item) => item._id),
        }))
      : ($(".check").prop("checked", false),
        setNewFilm({ ...newFilm, theaterId: [] }));
  };
  const CheckItem = () => {
    if (
      $('input[name="checkItem"]:checked').length ===
      $('input[name="checkItem"]').length
    ) {
      $("#checkAll").prop("checked", true);
    } else {
      $("#checkAll").prop("checked", false);
    }
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
  const CheckValidate = () => {
    if (
      !newFilm.img.substr(0, 30).toString().includes("jpeg") &&
      !newFilm.img.substr(0, 30).toString().includes("png")
    ) {
      props.setTextToast("File phải là .jpg hoặc .png");
      ToastUtils("fail");
      return false;
    } else if (!newFilm.category.toString().includes(",")) {
      props.setTextToast("Thể loại bao gồm ký tự ','");
      ToastUtils("fail");
      return false;
    } else if (newFilm.startingDay >= newFilm.closingDay) {
      props.setTextToast("Ngày kết thúc phải lớn hơn ngày bắt đầu");
      ToastUtils("fail");
      return false;
    } else if (newFilm.duration <= 0) {
      props.setTextToast("Thời lượng của phim phải lớn hơn 0");
      ToastUtils("fail");
      return false;
    }
    return true;
  };
  const Add = (e) => {
    e.preventDefault();
    if (CheckValidate()) {
      const listTheater = $('input[name="checkItem"]:checked');
      var arrTheater = Object.values(listTheater)
        .map((item) => item.value)
        .filter((item) => item !== undefined);
      var arrCategory = CheckSymbolToArray(newFilm.category);
      if (arrCategory) {
        arrCategory = arrCategory.filter((item) => item !== "");
        Axios.post("http://localhost:5000/admin/addFilm", {
          name: newFilm.name,
          duration: newFilm.duration,
          startingDay: newFilm.startingDay,
          closingDay: newFilm.closingDay,
          trailer: newFilm.trailer,
          img: newFilm.img,
          describe: newFilm.describe,
          category: arrCategory,
          showtimes: newFilm.showtimes,
          theaterId: arrTheater,
          room: newFilm.room,
        })
          .then(function (response) {
            props.setTextToast("Đã thêm phim mới");
            ToastUtils("success");
            props.setCheck(newFilm.name);
          })
          .catch(function (error) {
            props.setTextToast(error.response.data);
            ToastUtils("fail");
          });
      } else {
        props.setTextToast("Lỗi hệ thống. Vui lòng nhập lại!!!");
        ToastUtils("fail");
      }
    }
  };

  return (
    <div className="d-flex">
      <img
        src={newFilm.img}
        style={{
          width: "300px",
          height: "400px",
          marginRight: "10px",
          marginTop: "16px",
        }}
        alt=""
      />
      <div>
        <form
          className="row g-3"
          style={{ margin: "0 auto" }}
          onSubmit={(e) => Update("", e)}
        >
          <div className="col-md-6">
            <label className="form-label">Tên phim:</label>
            <input
              type="text"
              className=" form-control"
              name="name"
              id="detail"
              required
              disabled
              value={newFilm.name}
              onChange={(e) => handleChange(e.target.value)}
            ></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Thể loại:</label>
            <input
              type="text"
              className="form-control"
              required
              disabled
              name="category"
              id="detail"
              onChange={(e) => handleChange(e)}
              value={newFilm.category}
            ></input>
            <div className="form-text">
              Cách nhập: Nếu có 1 thể loại thì kết thúc bằng dấu phẩy (,) và
              nhiều hơn một thì cách nhau bởi dấu phẩy (,)
            </div>
          </div>
          <div className="col-6">
            <label className="form-label">Thời lượng:</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={newFilm.duration}
                name="duration"
                id="detail"
                required
                disabled
                onChange={(e) => handleChange(e)}
              ></input>
              <span class="input-group-text">Phút</span>
            </div>
          </div>
          <div className="col-6">
            <label className="form-label">Link trailer:</label>
            <input
              type="text"
              className=" form-control"
              required
              disabled
              name="trailer"
              id="detail"
              value={newFilm.trailer}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Ngày bắt đầu:</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => handleChange(e)}
              value={newFilm.startingDay.substring(0, 10)}
              name="startingDay"
              id="detail"
              required
              disabled
            ></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Ngày kết thúc:</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => handleChange(e)}
              value={newFilm.closingDay.substring(0, 10)}
              name="closingDay"
              id="detail"
              required
              disabled
            ></input>
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Mô tả:</label>
            <input
              type="text"
              className="form-control "
              value={newFilm.describe}
              name="describe"
              id="detail"
              maxLength={220}
              required
              disabled
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          {checked && (
            <>
              <div className="col-md-12 mb-3">
                <label className="form-label me-2">Poster phim:</label>
                <FileBase64
                  accept="image/*"
                  multiple={false}
                  type="file"
                  required
                  onDone={({ base64 }) => {
                    setNewFilm({ ...newFilm, img: base64 });
                  }}
                />
              </div>
              <div className="row ">
                {props.listTheater.map((item) => {
                  if (newFilm.theaterId.includes(item._id)) {
                    return (
                      <label className="col-md-4" key={item._id}>
                        <input
                          type="checkbox"
                          class="check"
                          name="checkItemFilmDetails"
                          value={item._id}
                          checked
                          onClick={(e) => CheckItem()}
                        ></input>{" "}
                        {item.name}
                      </label>
                    );
                  } else {
                    return (
                      <label className="col-md-4" key={item._id}>
                        <input
                          type="checkbox"
                          class="check"
                          name="checkItemFilmDetails"
                          value={item._id}
                          onClick={(e) => CheckItem()}
                        ></input>{" "}
                        {item.name}
                      </label>
                    );
                  }
                })}
              </div>
            </>
          )}

          <div
            className="w-75 mt-3 d-flex justify-content-center"
            style={{ margin: "0 auto" }}
          >
            <button
              type="button"
              className="btn mx-1 w-75 btn-primary"
              onClick={(e) => EditInfo()}
            >
              Sửa thông tin
            </button>
            {checked && (
              <>
                <button type="submit" className="btn mx-1 w-75 btn-success">
                  Cập nhật
                </button>
                <button
                  type="button"
                  className="btn mx-1 w-75 btn-secondary"
                  onClick={(e) => Update("cancel", e)}
                >
                  Huỷ
                </button>
              </>
            )}
            {!checked && (
              <button
                type="button"
                className="btn mx-1 w-75 btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#delete"
                onClick={(e) => props.setIdFilm(props.oneFilm[0]._id)}
              >
                Xoá phim
              </button>
            )}
          </div>
        </form>
        <div className="row w-75 pb-4" style={{ margin: "0 auto" }}>
          <div className="mt-3 d-flex justify-content-center">
            <button
              type="button"
              className="btn mx-1 w-100 btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#add"
            >
              Thêm phim mới
            </button>
            <button type="button" className="btn mx-1 w-100 btn-warning">
              Đặt vé trước
            </button>
          </div>
        </div>
      </div>

      {/* Modal Add */}
      <div
        class="modal fade"
        id="add"
        tabindex="-1"
        aria-labelledby="addLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addLabel">
                Thêm phim mới
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(e) => Add(e)}>
              <div class="modal-body row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tên phim:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    required
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Thể loại:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    onChange={(e) => handleChange(e)}
                    required
                  ></input>
                  <div className="form-text">
                    Cách nhập: Nếu có 1 thể loại thì kết thúc bằng dấu ',' và
                    nhiều hơn một thì cách nhau bởi dấu ','
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Thời lượng:</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      name="duration"
                      onChange={(e) => handleChange(e)}
                      required
                    ></input>
                    <span class="input-group-text">Phút</span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Link Trailer:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="trailer"
                    onChange={(e) => handleChange(e)}
                    id="link"
                    required
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Ngày bắt đầu:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startingDay"
                    onChange={(e) => handleChange(e)}
                    required
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Ngày kết thúc:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="closingDay"
                    onChange={(e) => handleChange(e)}
                    required
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Mô tả:</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="describe"
                    onChange={(e) => handleChange(e)}
                    id="link"
                    required
                    maxLength={220}
                  ></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label me-2">Poster phim:</label>
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    required
                    name="img"
                    onDone={({ base64 }) => {
                      setNewFilm({ ...newFilm, img: base64 });
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Thêm phim vào các rạp:</label>
                  <label className="col-md-12">
                    <input
                      type="checkbox"
                      class="check"
                      id="checkAll"
                      defaultChecked
                      onClick={(e) => CheckAll()}
                    ></input>{" "}
                    Tất cả
                  </label>
                  <div className="row">
                    {props.listTheater.map((item) => {
                      return (
                        <label className="col-md-4" key={item._id}>
                          <input
                            type="checkbox"
                            class="check"
                            name="checkItem"
                            defaultChecked
                            value={item._id}
                            onClick={(e) => CheckItem()}
                          ></input>{" "}
                          {item.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Huỷ
                </button>
                <button type="submit" class="btn btn-warning">
                  Thêm phim
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
