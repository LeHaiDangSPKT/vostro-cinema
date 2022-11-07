import * as React from "react";
import Axios from "axios";
import $ from "jquery";
import ReserveString from "../../utils/ReserveString";
import FormatTime from "../../utils/FormatTime";

export default function BookTicket(props) {
  const [checked, setChecked] = React.useState(false);
  const [allInfo, setAllInfo] = React.useState({
    film: {
      img: "",
      name: "",
      id: "",
    },
    theaterId: "",
    roomName: [],
    date: "",
    time: "",
    price: 0,
    seat: [],
    service: [],
  });
  const [currentFilm, setCurrentFilm] = React.useState({});
  const [currentShowtime, setCurrentShowtime] = React.useState([]);

  const [listFilms, setListFilms] = React.useState([]);
  const [listTheaters, setListTheaters] = React.useState([]);
  const [listDate, setListDate] = React.useState([]);
  const [listTime, setListTime] = React.useState([]);

  const selectPlace = $("select[id*='place']");
  const selectDay = $("select[id*='day']");
  const selectShowtime = $("select[id*='showtime']");

  //Get all film
  React.useEffect(() => {
    Axios.get("https://vostro-cinema.herokuapp.com/admin/getAllFilms").then(
      (response) => {
        setListFilms(response.data);
      }
    );
  }, []);
  //Get all theater
  React.useEffect(() => {
    Axios.get(
      "https://vostro-cinema.herokuapp.com/admin/getNameAndIdAllTheater"
    ).then((response) => {
      setListTheaters(response.data);
    });
  }, []);
  const selectedFilm = (idFilm) => {
    setCurrentFilm(listFilms.filter((item) => item._id == idFilm));

    if (idFilm == "") {
      setChecked(false);
      selectPlace.attr("disabled", true);
      selectDay.attr("disabled", true);
      selectShowtime.attr("disabled", true);
    } else {
      setChecked(true);
      selectPlace.attr("disabled", false);
    }
  };
  const selectedTheater = (idTheater) => {
    if (idTheater == "") {
      selectDay.attr("disabled", true);
      selectShowtime.attr("disabled", true);
    } else {
      setAllInfo({
        ...allInfo,
        theaterId: idTheater,
      });
      Axios.post(
        "https://vostro-cinema.herokuapp.com/admin/getAllShowtimeByIdFilmAndTheater",
        {
          idfilm: currentFilm[0]._id,
          idTheater: idTheater,
        }
      ).then((response) => {
        setCurrentShowtime(response.data);
        setListDate(
          response.data.map((item) => {
            return item.movieDate;
          })
        );
      });
      selectDay.attr("disabled", false);
    }
  };
  const selectedDay = (day) => {
    if (day == "") {
      selectShowtime.attr("disabled", true);
    } else {
      setAllInfo({
        ...allInfo,
        date: day,
      });
      setListTime(
        currentShowtime.filter((item) => item.movieDate.slice(0, 10) == day)
      );
      selectShowtime.attr("disabled", false);
    }
  };
  const selectedShowtime = (valueTime) => {
    setAllInfo({
      ...allInfo,
      film: {
        id: currentFilm[0]._id,
        name: currentFilm[0].name,
        img: currentFilm[0].img,
      },
      roomName: listTime
        .map((item) => {
          if (item.movieTime.some((el) => el.time == valueTime)) {
            return item.roomName;
          }
        })
        .filter((item) => item !== undefined),
      time: valueTime,
    });
  };

  var check = [];
  const next = () => {
    if (
      selectShowtime.prop("disabled") ||
      selectDay.prop("disabled") ||
      selectPlace.prop("disabled")
    ) {
      alert("Vui lòng chọn đầy đủ");
    } else {
      props.setData(allInfo);
      const collection = document.getElementsByClassName("slick-next");
      for (let i = 0; i < collection.length; i++) {
        if (collection[i].parentNode.outerHTML.includes("book")) {
          collection[i].click(function () {});
        }
      }
    }
  };
  try {
    return (
      <div className="bg-light rounded-3 p-4 mt-4 d-flex justify-content-between book">
        <div className="w-75 me-4" style={{ margin: "0 auto" }}>
          <h3 className="text-center text-success mb-0 ">
            ĐẶT VÉ NGAY BẠN YÊU ƠI
          </h3>
          <div className="mb-3">
            <label className="form-label">Chọn phim:</label>
            <select
              className="form-control"
              id="film"
              onChange={(e) => selectedFilm(e.target.value)}
            >
              <option value="">Choose..</option>
              {listFilms.map((item) => {
                return (
                  <option value={item._id} key={item._id} data-img={item.img}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Chọn rạp:</label>
            <select
              className="form-control"
              id="place"
              onChange={(e) => selectedTheater(e.target.value)}
              disabled
            >
              <option value="">Choose...</option>
              {listTheaters.map((item) => {
                try {
                  if (currentFilm[0].theaterId.includes(item._id)) {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  }
                } catch (error) {}
              })}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Chọn ngày:</label>
            <select
              className="form-control"
              id="day"
              onChange={(e) => selectedDay(e.target.value)}
              disabled
            >
              <option value="">Choose...</option>
              {listDate &&
                listDate
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map((item) => {
                    if (item !== undefined) {
                      item = item.slice(0, 10);
                      return (
                        <option value={item}>{ReserveString(item)}</option>
                      );
                    }
                  })}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Chọn suất chiếu:</label>
            <select
              className="form-control"
              id="showtime"
              onChange={(e) => selectedShowtime(e.target.value)}
              disabled
            >
              <option value="">Choose...</option>
              {listTime.map((item) => {
                return item.movieTime.map((time) => {
                  if (time.state == 1 && !check.includes(time.time)) {
                    check.push(time.time);
                    return (
                      <option key={item.time} value={time.time}>
                        {FormatTime(time.time.toString())}
                      </option>
                    );
                  }
                });
              })}
            </select>
          </div>
          <button
            id="btn_book"
            type="button"
            className="btn btn-success w-75 d-flex justify-content-center"
            style={{ margin: "0 auto" }}
            onClick={(e) => next(e)}
          >
            Đặt vé
          </button>
        </div>
        <div
          className="d-flex flex-column w-25"
          style={{ margin: "0 auto", marginTop: "40px" }}
        >
          {checked && <img src={currentFilm[0].img} className="" alt="" />}
          <span className="text-center text-light fs-5 bg-danger p-4 rounded-bottom">
            Tổng tiền: 0 đồng
          </span>
        </div>
      </div>
    );
  } catch (error) {
    alert(error);
  }
}
