import React from "react";
import FileBase64 from "react-file-base64";
import Axios from "axios";
import Toast from "../../Toast";
import ToastUtils from "../../../utils/ToastUtils";
import $ from "jquery";
import LoadingPage from "../../../utils/LoadingPage";

export default function ManagerFilms() {
  const [pageLoading, setPageLoading] = React.useState(true);

  const ref = React.useRef(null);
  const [textToast, setTextToast] = React.useState("");

  const [listNameTheater, setListNameTheater] = React.useState([]);
  const [id, setId] = React.useState("");
  const [listFilm, setListFilm] = React.useState([]);

  const [check, setCheck] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [checkAdd, setCheckAdd] = React.useState(false);
  const [idFilm, setIdFilm] = React.useState("");
  const [oneFilm, setOneFilm] = React.useState({
    id: "",
    name: "",
    duration: 0,
    startingDay: "",
    closingDay: "",
    trailer: "",
    img: "",
    describe: "",
    category: [],
    theaterId: [],
  });
  React.useEffect(() => {
    Axios.get(process.env.REACT_APP_API + "/admin/getNameAndIdAllTheater").then(
      (response) => {
        setListNameTheater(response.data);
        setId(response.data[0]._id);
      }
    );
  }, []);

  React.useEffect(() => {
    id &&
      Axios.get(
        `${process.env.REACT_APP_API}/admin/getAllFilmsById/${id}`
      ).then((response) => {
        setListFilm(response.data);
        setOneFilm({
          id: response.data[0]._id,
          name: response.data[0].name,
          duration: response.data[0].duration,
          startingDay: response.data[0].startingDay,
          closingDay: response.data[0].closingDay,
          trailer: response.data[0].trailer,
          img: response.data[0].img,
          describe: response.data[0].describe,
          category: response.data[0].category,
          theaterId: response.data[0].theaterId,
        });
        setPageLoading(false);
      });
  }, [id, check]);

  const CheckAll = () => {
    return $("#checkAll").prop("checked")
      ? ($(".check").prop("checked", true),
        setOneFilm({
          ...oneFilm,
          theaterId: listNameTheater.map((item) => item._id),
        }))
      : ($(".check").prop("checked", false),
        setOneFilm({ ...oneFilm, theaterId: [] }));
  };
  const CheckItem = () => {
    if (
      $('input[name="checkItem"]:checked').length === listNameTheater.length
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
      !oneFilm.img.substr(0, 30).toString().includes("jpeg") &&
      !oneFilm.img.substr(0, 30).toString().includes("png")
    ) {
      setTextToast("File phải là .jpg hoặc .png");
      ToastUtils("fail");
      return false;
    } else if (!oneFilm.category.toString().includes(",")) {
      setTextToast("Thể loại bao gồm ký tự ','");
      ToastUtils("fail");
      return false;
    } else if (oneFilm.startingDay >= oneFilm.closingDay) {
      setTextToast("Ngày kết thúc phải lớn hơn ngày bắt đầu");
      ToastUtils("fail");
      return false;
    } else if (oneFilm.duration <= 0) {
      setTextToast("Thời lượng của phim phải lớn hơn 0");
      ToastUtils("fail");
      return false;
    }
    return true;
  };

  const Delete = () => {
    Axios.put(`${process.env.REACT_APP_API}/admin/deleteFilmById/${idFilm}`)
      .then(function (response) {
        setCheck(Math.random());
        setTextToast("Đã xoá thành công");
        ToastUtils("success");
      })
      .catch(function (error) {});
  };
  const handleClickPencil = (id) => {
    const film = listFilm.filter((items) => items._id === id);
    setOneFilm({
      id: id,
      name: film[0].name,
      duration: film[0].duration,
      startingDay: film[0].startingDay,
      closingDay: film[0].closingDay,
      trailer: film[0].trailer,
      img: film[0].img,
      describe: film[0].describe,
      category: film[0].category,
      showtimes: film[0].showtimes,
      theaterId: film[0].theaterId,
      room: film[0].room,
    });
    ref.current?.scrollIntoView({ behavior: "smooth" });

    setChecked(false);
    $(`button[id*='edit']`)[0].disabled = false;
    var input = $("input[id*='detail']");
    for (var i = 0; i < input.length; i++) {
      input[i].disabled = true;
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "name") {
      if (listFilm.some((item) => item.name === e.target.value))
        alert("Tên phim đã tồn tại");
      else setOneFilm({ ...oneFilm, [e.target.name]: e.target.value });
    } else {
      setOneFilm({ ...oneFilm, [e.target.name]: e.target.value });
    }
  };
  const EditInfo = (state) => {
    var input = $("input[id*='detail']");
    for (var i = 0; i < input.length; i++) {
      input[i].disabled = state;
    }
    setChecked(!state);

    $(`button[id*='edit']`)[0].disabled = !state;
    $(`button[id*='add']`)[0].disabled = !state;
  };

  const handleAdd = (str, state) => {
    var checking = true;
    if (str == "add") {
      setOneFilm({
        id: "",
        name: "",
        duration: 0,
        startingDay: "",
        closingDay: "",
        trailer: "",
        img: "",
        describe: "",
        category: [],
        theaterId: [],
      });
      setChecked(!state);
    } else if (str == "cancel") {
      setChecked(!state);
      setOneFilm({
        id: "",
        name: listFilm[0].name,
        duration: listFilm[0].duration,
        startingDay: listFilm[0].startingDay,
        closingDay: listFilm[0].closingDay,
        trailer: listFilm[0].trailer,
        img: listFilm[0].img,
        describe: listFilm[0].describe,
        category: listFilm[0].category,
        theaterId: listFilm[0].theaterId,
      });
    } else {
      if (CheckValidate()) {
        const listTheater = $('input[name="checkItem"]:checked');
        var arrTheater = Object.values(listTheater)
          .map((item) => item.value)
          .filter((item) => item !== undefined);
        var arrCategory = CheckSymbolToArray(oneFilm.category);
        if (arrCategory) {
          setPageLoading(true);
          arrCategory = arrCategory.filter((item) => item !== "");
          Axios.post(process.env.REACT_APP_API + "/admin/addFilm", {
            name: oneFilm.name,
            duration: oneFilm.duration,
            startingDay: oneFilm.startingDay,
            closingDay: oneFilm.closingDay,
            trailer: oneFilm.trailer,
            img: oneFilm.img,
            describe: oneFilm.describe,
            category: arrCategory,
            showtimes: oneFilm.showtimes,
            theaterId: arrTheater,
            room: oneFilm.room,
          })
            .then(function (response) {
              setCheck(Math.random());
              setChecked(!state);
              setPageLoading(false);
              setTimeout(() => {
                setTextToast("Đã thêm phim mới");
                ToastUtils("success");
              }, 500);
            })
            .catch(function (error) {
              setTextToast(error);
              ToastUtils("fail");
            });
        } else {
          setTextToast("Lỗi hệ thống. Vui lòng nhập lại!!!");
          ToastUtils("fail");
        }
      } else {
        checking = false;
      }
    }
    if ((checked || str == "add" || str == "cancel") && checking) {
      var input = $("input[id*='detail']");
      for (var i = 0; i < input.length; i++) {
        input[i].disabled = state;
      }
      setCheckAdd(!state);
      try {
        $(`button[id*='add']`)[0].disabled = !state;
        $(`button[id*='edit']`)[0].disabled = !state;
        $(`button[id*='delete']`)[0].disabled = !state;
      } catch (error) {
        console.log(error);
      }
    }
  };
  const Update = (e) => {
    e.preventDefault();
    if (CheckValidate()) {
      const listNameTheater = $('input[name="checkItem"]:checked');
      var arrTheater = Object.values(listNameTheater)
        .map((item) => item.value)
        .filter((item) => item !== undefined);
      var arrCategory = CheckSymbolToArray(oneFilm.category.toString());
      if (arrCategory) {
        arrCategory = arrCategory.filter((item) => item !== "");
        Axios.put(
          `${process.env.REACT_APP_API}/admin/updateFilmById/${oneFilm.id}`,
          {
            name: oneFilm.name,
            duration: oneFilm.duration,
            startingDay: oneFilm.startingDay,
            closingDay: oneFilm.closingDay,
            trailer: oneFilm.trailer,
            img: oneFilm.img,
            describe: oneFilm.describe,
            category: arrCategory,
            theaterId: arrTheater,
          }
        )
          .then(function (response) {
            setTextToast("Đã cập nhật thành công");
            ToastUtils("success");
            setCheck(Math.random());
            setChecked(false);
            var input = $("input[id*='detail']");
            for (var i = 0; i < input.length; i++) {
              input[i].disabled = true;
            }
            $(`button[id*='edit']`)[0].disabled = false;
            $(`button[id*='add']`)[0].disabled = false;
          })
          .catch(function (error) {
            setTextToast(error.response.data);
            ToastUtils("fail");
          });
      } else {
        setTextToast("Lỗi hệ thống. Vui lòng nhập lại!!!");
        ToastUtils("fail");
      }
    }
  };

  return (
    <>
      {pageLoading ? (
        <LoadingPage />
      ) : (
        <div className="bg-light p-4">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center text-success mt-2">CÁC PHIM CÓ SẴN</h3>
              Lựa chọn rạp:
              <select
                className="mx-3 rounded-2"
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                {listNameTheater.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="table__header" scope="col">
                      #
                    </th>
                    <th className="table__header" scope="col">
                      Tên phim
                    </th>
                    <th className="table__header" scope="col">
                      Thể loại
                    </th>
                    <th className="table__header" scope="col">
                      Thời lượng
                    </th>
                    <th className="table__header" scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {listFilm.map((item, index) => {
                    return (
                      <tr key={item._id} className="table__row">
                        <th>{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.category.toString()}</td>
                        <td>{item.duration} phút</td>
                        <td>
                          <button
                            className="btn border-light"
                            onClick={(e) => handleClickPencil(item._id)}
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </button>
                          <button
                            className="btn border-light"
                            data-bs-toggle="modal"
                            data-bs-target="#delete"
                            onClick={(e) => setIdFilm(item._id)}
                          >
                            <i className="fa-solid fa-trash-can text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
                        Xoá phim
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Phim sẽ bị khoá vĩnh viễn và không thể khôi phục
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
            </div>
            {oneFilm && (
              <div className="col-md-12" ref={ref}>
                {!checkAdd ? (
                  <h3 className="text-center text-success mt-2">
                    THÔNG TIN CHI TIẾT
                  </h3>
                ) : (
                  <h3 className="text-center text-success mt-2">
                    THÊM PHIM MỚI
                  </h3>
                )}

                <div className="d-flex">
                  <img
                    src={oneFilm.img}
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
                      onSubmit={(e) => Update(e)}
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
                          value={oneFilm.name}
                          onChange={(e) => handleChange(e)}
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
                          value={oneFilm.category}
                        ></input>
                        <div className="form-text">
                          Cách nhập: Nếu có 1 thể loại thì kết thúc bằng dấu
                          phẩy (,) và nhiều hơn một thì cách nhau bởi dấu phẩy
                          (,)
                        </div>
                      </div>
                      <div className="col-6">
                        <label className="form-label">Thời lượng:</label>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            value={oneFilm.duration}
                            name="duration"
                            id="detail"
                            required
                            disabled
                            onChange={(e) => handleChange(e)}
                          ></input>
                          <span className="input-group-text">Phút</span>
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
                          value={oneFilm.trailer}
                          onChange={(e) => handleChange(e)}
                        ></input>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Ngày bắt đầu:</label>
                        <input
                          type="date"
                          className="form-control"
                          onChange={(e) => handleChange(e)}
                          value={oneFilm.startingDay.substring(0, 10)}
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
                          value={oneFilm.closingDay.substring(0, 10)}
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
                          value={oneFilm.describe}
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
                            <label className="form-label me-2">
                              Poster phim:
                            </label>
                            <FileBase64
                              accept="image/*"
                              multiple={false}
                              type="file"
                              required
                              onDone={({ base64 }) => {
                                setOneFilm({ ...oneFilm, img: base64 });
                              }}
                            />
                          </div>
                          <div className="row ">
                            <label className="col-md-12">
                              <input
                                type="checkbox"
                                className="check"
                                id="checkAll"
                                onClick={(e) => CheckAll()}
                              ></input>
                              Tất cả
                            </label>
                            {listNameTheater.map((item) => {
                              if (oneFilm.theaterId.includes(item._id)) {
                                return (
                                  <label className="col-md-4" key={item._id}>
                                    <input
                                      type="checkbox"
                                      className="check"
                                      name="checkItem"
                                      value={item._id}
                                      id={item._id}
                                      defaultChecked
                                      onChange={(e) => CheckItem()}
                                    ></input>{" "}
                                    {item.name}
                                  </label>
                                );
                              } else {
                                return (
                                  <label className="col-md-4" key={item._id}>
                                    <input
                                      type="checkbox"
                                      className="check"
                                      name="checkItem"
                                      value={item._id}
                                      onChange={(e) => CheckItem()}
                                    ></input>{" "}
                                    {item.name}
                                  </label>
                                );
                              }
                            })}
                          </div>
                        </>
                      )}
                      {!checkAdd && (
                        <div
                          className="w-75 mt-3 d-flex justify-content-center"
                          style={{ margin: "0 auto" }}
                        >
                          <button
                            type="button"
                            className="btn mx-1 w-75 btn-primary"
                            id="edit"
                            onClick={(e) => EditInfo(false)}
                          >
                            Sửa thông tin
                          </button>
                          {checked && (
                            <>
                              <button
                                type="submit"
                                className="btn mx-1 w-75 btn-success"
                              >
                                Cập nhật
                              </button>
                              <button
                                type="button"
                                id="cancel"
                                className="btn mx-1 w-75 btn-secondary"
                                onClick={(e) => EditInfo(true)}
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
                              id="delete"
                              onClick={(e) => setIdFilm(oneFilm.id)}
                            >
                              Xoá phim
                            </button>
                          )}
                        </div>
                      )}
                    </form>
                    <div className="row w-75 pb-4" style={{ margin: "0 auto" }}>
                      <div className="mt-3 d-flex justify-content-center">
                        <button
                          type="button"
                          id="add"
                          className="btn mx-1 w-100 btn-primary"
                          onClick={(e) => handleAdd("add", false)}
                        >
                          Thêm phim mới
                        </button>
                        {checkAdd && (
                          <>
                            <button
                              type="button"
                              id="add"
                              className="btn mx-1 w-100 btn-success"
                              onClick={(e) => handleAdd("confirm", true)}
                            >
                              Xác nhận
                            </button>
                            <button
                              type="button"
                              id="add"
                              className="btn mx-1 w-100 btn-secondary"
                              onClick={(e) => handleAdd("cancel", true)}
                            >
                              Huỷ
                            </button>
                          </>
                        )}
                        {!checkAdd && (
                          <button
                            type="button"
                            className="btn mx-1 w-100 btn-warning"
                          >
                            Đặt vé trước
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Toast text={textToast} bg="bg-danger" id="fail" />
          <Toast text={textToast} bg="bg-success" id="success" />
        </div>
      )}
    </>
  );
}
