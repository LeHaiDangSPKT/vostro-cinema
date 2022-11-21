import * as React from "react";
import Axios from "axios";
import CurrencyFormat from "react-currency-format";
import $ from "jquery";

export default function BookSeat(props) {
  const [currentRoom, setCurrentRoom] = React.useState("");
  const [seat, setSeat] = React.useState([]);
  const [listChairService, setListChairService] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  //Get seat
  React.useEffect(() => {
    Axios.get(process.env.REACT_APP_API + "/admin/getChairService").then(
      (response) => {
        setListChairService(response.data);
        setCurrentRoom(props.data.roomName[0]);
      }
    );
  }, []);

  //Get bill
  React.useEffect(() => {
    try {
      const roomName = props.data.roomName[0];
      Axios.post(process.env.REACT_APP_API + "/user/findBill", {
        theaterId: props.data.theaterId,
        showtime: props.data.date + "-" + props.data.time,
        roomName: currentRoom == "" ? roomName : currentRoom,
        film: props.data.film,
      }).then((response) => {
        console.log(response.data);
        var list = [];
        if (response.data.length > 0) {
          for (var i = 0; i < response.data.length; i++) {
            list.push(response.data[i].seat);
          }
        }
        const li = $("li[class*='seat']");
        if (list.length > 0) {
          Object.values(li).map((item) => {
            if (list.join().includes(item.outerText)) {
              item.classList.add("custom-disabled");
            } else {
              item.classList.remove("custom-disabled");
            }
          });
        } else {
          Object.values(li).map((item) => {
            item.classList.remove("custom-disabled");
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentRoom, props.data.roomName]);
  const next = () => {
    if (seat.length) {
      const collection = document.getElementsByClassName("slick-next");
      for (let i = 0; i < collection.length; i++) {
        if (collection[i].parentNode.outerHTML.includes("book")) {
          collection[i].click(function () {});
        }
      }
      props.setData({
        ...props.data,
        //Tam thoi
        roomName: currentRoom || props.data.roomName[0],
        price: price,
        seat: seat,
      });
    } else {
      alert("Vui lòng chọn chỗ ngồi");
    }
  };

  const prev = () => {
    const collection = document.getElementsByClassName("slick-prev");
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].parentNode.outerHTML.includes("book")) {
        collection[i].click(function () {});
      }
    }
  };

  const SelectedSeat = (e) => {
    e.target.classList.toggle("border-bottom-seat");
    if (!seat.includes(e.target.outerText)) {
      setSeat([...seat, e.target.outerText]);
      setPrice((prev) => prev + e.target.value);
    } else {
      setSeat(seat.filter((item) => item != e.target.outerText));
      setPrice((prev) => prev - e.target.value);
    }
  };

  const dataSingleSeat = () => {
    const rows = [];
    for (let index = 65; index < 70; index++) {
      for (let i = 1; i <= 10; i++) {
        rows.push(
          <li
            className={`seat-single `}
            value={listChairService[0].chair[0].price}
            onClick={(e) => SelectedSeat(e)}
          >
            {String.fromCharCode(index) + i + ""}
          </li>
        );
      }
    }
    return rows;
  };
  const dataDoubleSeat = () => {
    const nameRow = 70; //F
    const rows = [];
    for (let i = 1; i <= 5; i++) {
      rows.push(
        <li
          className={`seat-double`}
          value={listChairService[0].chair[1].price}
          onClick={(e) => SelectedSeat(e)}
        >
          {String.fromCharCode(nameRow) + i + ""}
        </li>
      );
    }
    return rows;
  };

  try {
    return (
      <div className="bg-light rounded-3 p-4 mt-4 d-flex justify-content-between book">
        <div className="w-75 me-4 rs-w-100" style={{ margin: "0 auto" }}>
          <h3 className="text-center text-success mb-0 ">CHỌN GHẾ</h3>
          <h4 className="text-center text-light mb-0 mt-3 py-2 bg-dark border rounded-3">
            MÀN HÌNH
          </h4>
          <div className="my-3 w-25 rs-w-100">
            <label className="form-label">Chọn phòng chiếu:</label>
            <select
              className="form-control"
              id="film"
              onChange={(e) => setCurrentRoom(e.target.value)}
            >
              {props.data.roomName.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <span className="text-center rs-hide">
              Lối vào<i className="fa-solid fa-arrow-down"></i>
            </span>
            <ul className="seat">
              {dataSingleSeat()}
              {dataDoubleSeat()}
            </ul>
          </div>
          <div
            style={{ marginLeft: "35px", marginBottom: "10px" }}
            className="rs-m-0-auto"
          >
            <label className="fw-bold fs-5">Ghi chú:</label>
            <div className="d-flex justify-content-center">
              <div className="mx-2 border-success border-3 border-bottom p-2 rounded-2">
                Ghế đơn
              </div>
              <div className="mx-2 border-danger border-3 border-bottom p-2 rounded-2">
                Ghế đôi
              </div>
              <div className="mx-2 border-warning border-3 border-bottom p-2 rounded-2">
                Ghế đã chọn
              </div>
              <div className="mx-2 border-info border-3 border-bottom p-2 rounded-2">
                Ghế đã đặt
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success w-75 d-flex justify-content-center rs-mt-10"
            style={{ margin: "0 auto" }}
            onClick={next}
          >
            Tiếp tục
          </button>
          <button
            type="button"
            className="btn btn-success w-75 mt-2 d-flex justify-content-center"
            style={{ margin: "0 auto" }}
            onClick={prev}
          >
            Quay về
          </button>
        </div>
        <div
          className="d-flex flex-column w-25 rs-hide-only-mobile"
          style={{ margin: "0 auto", marginTop: "50px" }}
        >
          <img src={props.data.film.img} className="" alt="" />
          <span className="text-center text-light fs-5 bg-danger p-4 rounded-bottom">
            <CurrencyFormat
              prefix={"Tổng tiền: "}
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              thousandSpacing={3}
              suffix={" VND"}
            />
          </span>
        </div>
      </div>
    );
  } catch (error) {
    prev();
  }
}
