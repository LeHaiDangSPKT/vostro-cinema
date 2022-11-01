import * as React from "react";
import Axios from "axios";
import $ from "jquery";
export default function BookTicket(props) {
  const [checked, setChecked] = React.useState(false);
  const [allInfo, setAllInfo] = React.useState({
    film: {
      img: "",
      name: "",
      id: "",
    },
    theaterId: "",
    date: "",
    time: "",
    price: 0,
    seat: [],
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
    Axios.get("http://localhost:5000/admin/getAllFilms").then((response) => {
      setListFilms(response.data);
    });
  }, []);
  //Get all theater
  React.useEffect(() => {
    Axios.get("http://localhost:5000/admin/getNameAndIdAllTheater").then(
      (response) => {
        setListTheaters(response.data);
      }
    );
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
        "http://localhost:5000/admin/getAllShowtimeByIdFilmAndTheater",
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

  return (
    <div className="bg-light rounded-3 p-4 mt-4 d-flex justify-content-between book">
      <div className="w-75 me-4" style={{ margin: "0 auto" }}>
        <h3 className="text-center text-success mb-0 ">
          ĐẶT VÉ NGAY BẠN YÊU ƠI
        </h3>
        <div className="mb-3">
          <label className="form-label">Chọn phim:</label>
          <select
            class="form-control"
            id="film"
            onChange={(e) => selectedFilm(e.target.value)}
          >
            <option value="">Choose..</option>
            {listFilms.map((item) => {
              return (
                <option value={item._id} data-img={item.img}>
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
                  return <option value={item._id}>{item.name}</option>;
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
            {listDate
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((item) => {
                item = item.slice(0, 10);
                return <option value={item}>{item}</option>;
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
                  return <option value={time.time}>{time.time}</option>;
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
          onClick={(e) => next()}
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
}
