import React from "react";
import Axios from "axios";
import $ from "jquery";
import Toast from "../../Toast";
import ToastUtils from "../../../utils/ToastUtils";

export default function ManagerCalender() {
  let newDate = new Date();
  var flagForSold = 1;
  var flagForSchedule = 1;

  const data = [
    { text: "7h00", value: 700 },
    { text: "7h10", value: 710 },
    { text: "7h20", value: 720 },
    { text: "7h30", value: 730 },
    { text: "7h40", value: 740 },
    { text: "7h50", value: 750 },

    { text: "8h00", value: 800 },
    { text: "8h10", value: 810 },
    { text: "8h20", value: 820 },
    { text: "8h30", value: 830 },
    { text: "8h40", value: 840 },
    { text: "8h50", value: 850 },

    { text: "9h00", value: 900 },
    { text: "9h10", value: 910 },
    { text: "9h20", value: 920 },
    { text: "9h30", value: 930 },
    { text: "9h40", value: 940 },
    { text: "9h50", value: 950 },

    { text: "10h00", value: 1000 },
    { text: "10h10", value: 1010 },
    { text: "10h20", value: 1020 },
    { text: "10h30", value: 1030 },
    { text: "10h40", value: 1040 },
    { text: "10h50", value: 1050 },

    { text: "11h00", value: 1100 },
    { text: "11h10", value: 1110 },
    { text: "11h20", value: 1120 },
    { text: "11h30", value: 1130 },
    { text: "11h40", value: 1140 },
    { text: "11h50", value: 1150 },

    { text: "12h00", value: 1200 },
    { text: "12h10", value: 1210 },
    { text: "12h20", value: 1220 },
    { text: "12h30", value: 1230 },
    { text: "12h40", value: 1240 },
    { text: "12h50", value: 1250 },

    { text: "13h00", value: 1300 },
    { text: "13h10", value: 1310 },
    { text: "13h20", value: 1320 },
    { text: "13h30", value: 1330 },
    { text: "13h40", value: 1340 },
    { text: "13h50", value: 1350 },

    { text: "14h00", value: 1400 },
    { text: "14h10", value: 1410 },
    { text: "14h20", value: 1420 },
    { text: "14h30", value: 1430 },
    { text: "14h40", value: 1440 },
    { text: "14h50", value: 1450 },

    { text: "15h00", value: 1500 },
    { text: "15h10", value: 1510 },
    { text: "15h20", value: 1520 },
    { text: "15h30", value: 1530 },
    { text: "15h40", value: 1540 },
    { text: "15h50", value: 1550 },

    { text: "16h00", value: 1600 },
    { text: "16h10", value: 1610 },
    { text: "16h20", value: 1620 },
    { text: "16h30", value: 1630 },
    { text: "16h40", value: 1640 },
    { text: "16h50", value: 1650 },

    { text: "17h00", value: 1700 },
    { text: "17h10", value: 1710 },
    { text: "17h20", value: 1720 },
    { text: "17h30", value: 1730 },
    { text: "17h40", value: 1740 },
    { text: "17h50", value: 1750 },

    { text: "18h00", value: 1800 },
    { text: "18h10", value: 1810 },
    { text: "18h20", value: 1820 },
    { text: "18h30", value: 1830 },
    { text: "18h40", value: 1840 },
    { text: "18h50", value: 1850 },

    { text: "19h00", value: 1900 },
    { text: "19h10", value: 1910 },
    { text: "19h20", value: 1920 },
    { text: "19h30", value: 1930 },
    { text: "19h40", value: 1940 },
    { text: "19h50", value: 1950 },

    { text: "20h00", value: 2000 },
    { text: "20h10", value: 2010 },
    { text: "20h20", value: 2020 },
    { text: "20h30", value: 2030 },
    { text: "20h40", value: 2040 },
    { text: "20h50", value: 2050 },

    { text: "21h00", value: 2100 },
    { text: "21h10", value: 2110 },
    { text: "21h20", value: 2120 },
    { text: "21h30", value: 2130 },
    { text: "21h40", value: 2140 },
    { text: "21h50", value: 2150 },

    { text: "22h00", value: 2200 },
    { text: "22h10", value: 2210 },
    { text: "22h20", value: 2220 },
    { text: "22h30", value: 2230 },
    { text: "22h40", value: 2240 },
    { text: "22h50", value: 2250 },

    { text: "23h00", value: 2300 },
    { text: "23h10", value: 2310 },
    { text: "23h20", value: 2320 },
    { text: "23h30", value: 2330 },
    { text: "23h40", value: 2340 },
    { text: "23h50", value: 2350 },
  ];

  const [checked, setChecked] = React.useState(false);
  const [dataTimeDB, setDataTimeDB] = React.useState([]);
  const [textToast, setTextToast] = React.useState("");
  const [filmTime, setFilmTime] = React.useState({
    startingDay: "",
    closingDay: "",
  });
  const [listNameTheater, setListNameTheater] = React.useState([]);
  const [listFilm, setListFilm] = React.useState([]);
  const [listFilmScheduled, setListFilmScheduled] = React.useState([]);
  const [listFilmSold, setListFilmSold] = React.useState([]);
  const [id, setId] = React.useState("");
  const [idShowTime, setIdShowTime] = React.useState("");
  const [showTime, setShowTime] = React.useState(0);
  const [idScheduled, setIdScheduled] = React.useState("");
  const [idSold, setidSold] = React.useState("");
  const [temp, setTemp] = React.useState("");
  const [oneShowTime, setOneShowTime] = React.useState({
    theaterId: "",
    filmId: "",
    filmName: "",
    roomName: "",
    movieDate: "",
    movieTime: [],
    duration: 0,
    state: 2,
  });

  React.useEffect(() => {
    Axios.get("http://localhost:5000/admin/getNameAndIdAllTheater").then(
      (response) => {
        setListNameTheater(response.data);
        setId(response.data[0]._id);
        setIdScheduled(response.data[0]._id);
        setidSold(response.data[0]._id);
      }
    );
  }, []);
  React.useEffect(() => {
    id &&
      Axios.get(`http://localhost:5000/admin/getAllFilmsById/${id}`).then(
        (response) => {
          setListFilm(response.data);
          setFilmTime({
            startingDay: response.data[0].startingDay.substr(0, 10),
            closingDay: response.data[0].closingDay.substr(0, 10),
          });
          setOneShowTime({
            theaterId: id,
            filmId: response.data[0]._id,
            filmName: response.data[0].name,
            duration: response.data[0].duration,
          });
        }
      );
  }, [id]);

  React.useEffect(() => {
    idScheduled &&
      Axios.get(
        `http://localhost:5000/admin/getAllShowTimesById/${idScheduled}`
      ).then((response) => {
        setListFilmScheduled(response.data);
      });
  }, [idScheduled, temp]);
  React.useEffect(() => {
    idSold &&
      Axios.get(
        `http://localhost:5000/admin/getAllShowTimesById/${idSold}`
      ).then((response) => {
        setListFilmSold(response.data);
      });
  }, [idSold, temp]);

  const handleChange = (e) => {
    setOneShowTime({ ...oneShowTime, [e.target.name]: e.target.value });
  };

  const getNameAndIdFilm = (e) => {
    setFilmTime({
      startingDay: e.target.selectedOptions[0]
        .getAttribute("begin")
        .substr(0, 10),
      closingDay: e.target.selectedOptions[0].getAttribute("end").substr(0, 10),
    });
    setOneShowTime({
      ...oneShowTime,
      duration: e.target.selectedOptions[0].getAttribute("duration"),
      filmId: e.target.value,
      filmName: e.target.selectedOptions[0].text,
    });
  };
  const HandleAdd = () => {
    const eleCheckBox = $('input[name="checkItem"]:checked');
    if (eleCheckBox.length !== 0) {
      var arrTime = Object.values(eleCheckBox)
        .map((item) => +item.value)
        .filter((item) => !!item);
      if (dataTimeDB == null) {
        Axios.post(`http://localhost:5000/admin/addShowTime/`, {
          theaterId: id,
          filmId: oneShowTime.filmId,
          filmName: oneShowTime.filmName,
          roomName: oneShowTime.roomName,
          movieDate: oneShowTime.movieDate,
          duration: oneShowTime.duration,
          movieTime: arrTime.map((item) => {
            return {
              state: 2,
              time: item,
            };
          }),
        })
          .then(function (response) {
            var input = $("input[id*='add']");
            var select = $("select[id*='add']");
            input.attr("disabled", false);
            select.attr("disabled", false);
            setTemp(Math.random());
            setTextToast("Đã thêm vào danh sách lên lịch");
            ToastUtils("success");
            setChecked(false);
          })
          .catch(function (error) {
            setTextToast(error.response.data);
            ToastUtils("fail");
          });
      } else {
        Axios.put(`http://localhost:5000/admin/updateShowTime/${idShowTime}`, {
          movieTime: arrTime.map((item) => {
            return {
              state: 2,
              time: item,
            };
          }),
        })
          .then(function (response) {
            var input = $("input[id*='add']");
            var select = $("select[id*='add']");
            input.attr("disabled", false);
            select.attr("disabled", false);
            setTextToast("Đã thêm vào danh sách lên lịch");
            ToastUtils("success");
            setChecked(false);
          })
          .catch(function (error) {
            setTextToast(error.response.data);
            ToastUtils("fail");
          });
      }
    } else {
      setTextToast("Bạn cần chọn ít nhất một khung giờ");
      ToastUtils("fail");
    }
  };
  const HandleShowTime = (e) => {
    e.preventDefault();
    var input = $("input[id*='add']");
    var select = $("select[id*='add']");
    input.attr("disabled", true);
    select.attr("disabled", true);

    Axios.post("http://localhost:5000/admin/getOneShowTime", {
      theaterId: oneShowTime.theaterId,
      roomName: oneShowTime.roomName,
      movieDate: oneShowTime.movieDate,
    }).then((response) => {
      if (response.data != null) {
        setIdShowTime(response.data._id);
        setDataTimeDB(
          response.data.movieTime.map((item) => {
            return {
              start: parseInt(item.time),
              end: parseInt(item.time) + response.data.duration + 10,
            };
          })
        );
      } else {
        setDataTimeDB(null);
      }
    });
    setChecked(true);
  };

  const Change = () => {
    Axios.put(
      `http://localhost:5000/admin/updateStateShowTimeById/${idShowTime}`,
      {
        time: showTime,
      }
    )
      .then(function (response) {
        setTemp(Math.random());
        setTextToast("Đã mở bán suất chiếu");
        ToastUtils("success");
      })
      .catch(function (error) {
        setTextToast(error.response.data);
        ToastUtils("fail");
      });
  };
  const Delete = () => {
    Axios.post(`http://localhost:5000/admin/deleteShowTimeById/${idShowTime}`, {
      time: showTime,
    })
      .then(function (response) {
        setTemp(Math.random());
        setTextToast("Đã xoá suất chiếu");
        ToastUtils("success");
      })
      .catch(function (error) {
        setTextToast(error.response.data);
        ToastUtils("fail");
      });
  };

  return (
    <div className="bg-light">
      {/* DANH SÁCH MỞ BÁN */}
      <div className="p-4">
        <h3 className="text-center text-success mt-2">
          QUẢN LÝ CÁC SUẤT CHIẾU ĐÃ MỞ BÁN
        </h3>
        Lựa chọn rạp:
        <select
          className="mx-3 rounded-2"
          onChange={(e) => setidSold(e.target.value)}
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
                Suất chiếu
              </th>
              <th className="table__header" scope="col">
                Phòng chiếu
              </th>
            </tr>
          </thead>
          <tbody>
            {listFilmSold.map((item) => {
              return item.movieTime.map((movieTime) => {
                if (movieTime.state == 1) {
                  return (
                    <tr key={item._id} className="table__row">
                      <th>{flagForSold++}</th>
                      <td>{item.filmName}</td>
                      <td>
                        {`${item.movieDate.substr(0, 10)} - ${(
                          movieTime.time + ""
                        ).slice(0, (movieTime.time + "").length - 2)}h${(
                          movieTime.time + ""
                        ).slice(-2)}`}
                      </td>
                      <td>{item.roomName}</td>
                    </tr>
                  );
                }
              });
            })}
          </tbody>
        </table>
      </div>

      {/* LÊN LỊCH */}
      <div className="p-4">
        <h3 className="text-center text-success mt-2">
          QUẢN LÝ CÁC SUẤT CHIẾU ĐÃ LÊN LỊCH
        </h3>
        Lựa chọn rạp:
        <select
          className="mx-3 rounded-2"
          onChange={(e) => setIdScheduled(e.target.value)}
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
                Suất chiếu
              </th>
              <th className="table__header" scope="col">
                Phòng chiếu
              </th>
              <th className="table__header" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listFilmScheduled.map((item) => {
              return item.movieTime.map((movieTime) => {
                if (movieTime.state == 2) {
                  return (
                    <tr key={item._id} className="table__row">
                      <th>{flagForSchedule++}</th>
                      <td>{item.filmName}</td>
                      <td>
                        {`${item.movieDate.substr(0, 10)} - ${(
                          movieTime.time + ""
                        ).slice(0, (movieTime.time + "").length - 2)}h${(
                          movieTime.time + ""
                        ).slice(-2)}`}
                      </td>
                      <td>{item.roomName}</td>
                      <td>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            marginRight: "15px",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#change"
                          onClick={(e) => {
                            setIdShowTime(item._id);
                            setShowTime(movieTime.time);
                          }}
                        >
                          <i className="fa-sharp fa-solid fa-upload text-danger"></i>
                        </button>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#delete"
                          onClick={(e) => {
                            setIdShowTime(item._id);
                            setShowTime(movieTime.time);
                          }}
                        >
                          <i className="fa-solid fa-trash-can text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  );
                }
              });
            })}
          </tbody>
        </table>
        {/* MODAL DELETE */}
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
                  Xoá suất chiếu
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Suất chiếu sẽ bị xoá vĩnh viễn và không thể khôi phục
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
        {/* MODAL CHANGE STATE */}
        <div
          className="modal fade"
          id="change"
          tabIndex="-1"
          aria-labelledby="changeLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="changeLabel">
                  Mở bán suất chiếu này
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Suất chiếu sẽ được mở bán và không thể khôi phục
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
                  onClick={(e) => Change()}
                >
                  Tôi chắn chắn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-center text-success mt-2">THÊM SUẤT CHIẾU</h3>
        <form className="row g-3 px-4" onSubmit={(e) => HandleShowTime(e)}>
          <div className="row g-3 justify-content-center">
            <div className="col-md-4">
              <label className="form-label">Chọn ngày chiếu:</label>
              <input
                type="date"
                id="add-date"
                className=" form-control"
                name="movieDate"
                value={oneShowTime.movieDate}
                required
                disabled
                onChange={(e) => handleChange(e)}
                min={
                  newDate.toISOString().split("T")[0] > filmTime.startingDay
                    ? newDate.toISOString().split("T")[0]
                    : filmTime.startingDay
                }
                max={filmTime.closingDay}
              ></input>
            </div>
            <div className="col-md-4">
              <label className="form-label">Chọn rạp:</label>
              <select
                id="add-theater"
                className="rounded-2 form-control"
                onChange={(e) => {
                  setId(e.target.value);
                  var input = $("input[id*='add']");
                  input.attr("disabled", false);
                }}
                required
              >
                <option value="">Choose...</option>
                {listNameTheater.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row g-3 justify-content-center">
            <div className="col-md-4">
              <label className="form-label">Chọn phim:</label>
              <select
                id="add-film"
                className="rounded-2 form-control"
                onChange={(e) => getNameAndIdFilm(e)}
                required
              >
                <option value="">Choose...</option>
                {listFilm.map((item) => {
                  return (
                    <option
                      key={item._id}
                      value={item._id}
                      begin={item.startingDay}
                      end={item.closingDay}
                      duration={item.duration}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Chọn phòng:</label>
              <select
                id="add-room"
                className="rounded-2 form-control"
                name="roomName"
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="">Choose...</option>
                {listNameTheater.map((item) => {
                  if (item._id === id) {
                    return item.room.map((room) => {
                      return (
                        <option key={room} value={room}>
                          {room}
                        </option>
                      );
                    });
                  }
                })}
              </select>
            </div>
          </div>
          <div className="text-center py-4">
            <button className="btn btn-success w-75" type="submit">
              Tìm suất chiếu trống
            </button>
          </div>

          {checked && (
            <>
              <div className="col-md-12 justify-content-center text-center">
                {data.map((item) => {
                  if (dataTimeDB != null) {
                    var flag = true;
                    for (var i = 0; i < dataTimeDB.length; i++) {
                      if (
                        item.value >= dataTimeDB[i].start &&
                        item.value <= dataTimeDB[i].end
                      ) {
                        flag = false;
                        break;
                      }
                    }
                    if (flag) {
                      return (
                        <label className="col-md-2" key={item.value}>
                          <input
                            name="checkItem"
                            type="checkbox"
                            value={item.value}
                          ></input>{" "}
                          {item.text}
                        </label>
                      );
                    }
                  } else {
                    return (
                      <label className="col-md-2" key={item.value}>
                        <input
                          name="checkItem"
                          type="checkbox"
                          value={item.value}
                        ></input>{" "}
                        {item.text}
                      </label>
                    );
                  }
                })}
              </div>

              <div className="text-center py-4">
                <button
                  className="btn btn-success w-75"
                  onClick={(e) => HandleAdd()}
                >
                  Thêm suất chiếu
                </button>
                <button
                  className="btn btn-secondary w-75 mt-2"
                  onClick={(e) => {
                    var input = $("input[id*='add']");
                    var select = $("select[id*='add']");
                    input.attr("disabled", false);
                    select.attr("disabled", false);
                    setChecked(false);
                  }}
                >
                  Huỷ
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      <Toast text={textToast} bg="bg-danger" id="fail" />
      <Toast text={textToast} bg="bg-success" id="success" />
    </div>
  );
}
