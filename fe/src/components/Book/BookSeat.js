import * as React from "react";
import Axios from "axios";

export default function BookSeat(props) {
  const next = () => {
    const collection = document.getElementsByClassName("slick-next");
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].parentNode.outerHTML.includes("book")) {
        collection[i].click(function () {});
      }
    }
    props.setData({
      ...props.data,
      price: price,
      seat: seat,
    });
  };

  const prev = () => {
    const collection = document.getElementsByClassName("slick-prev");
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].parentNode.outerHTML.includes("book")) {
        collection[i].click(function () {});
      }
    }
  };

  const [seat, setSeat] = React.useState([]);
  const [listSeat, setListSeat] = React.useState([]);
  const [price, setPrice] = React.useState(0);
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
  console.log(seat);

  //Get seat
  React.useEffect(() => {
    Axios.get("http://localhost:5000/admin/getChairService").then(
      (response) => {
        setListSeat(response.data);
      }
    );
  }, []);
  const dataSingleSeat = () => {
    const rows = [];
    for (let index = 65; index < 70; index++) {
      for (let i = 1; i <= 10; i++)
        rows.push(
          <li
            className="seat-single"
            value={listSeat[0].chair[0].price}
            onClick={(e) => SelectedSeat(e)}
          >
            {String.fromCharCode(index) + i + ""}
          </li>
        );
    }
    return rows;
  };
  const dataDoubleSeat = () => {
    const nameRow = 70; //F
    const rows = [];
    for (let i = 1; i <= 5; i++)
      rows.push(
        <li
          className="seat-double"
          value={listSeat[0].chair[1].price}
          onClick={(e) => SelectedSeat(e)}
        >
          {String.fromCharCode(nameRow) + i + ""}
        </li>
      );
    return rows;
  };
  try {
    return (
      <div className="bg-light rounded-3 p-4 mt-4 d-flex justify-content-between book">
        <div className="w-75 me-4" style={{ margin: "0 auto" }}>
          <h3 className="text-center text-success mb-0 ">CHỌN GHẾ</h3>
          <h4 className="text-center text-light mb-0 mt-3 py-2 bg-dark border rounded-3">
            MÀN HÌNH
          </h4>
          <div className="d-flex justify-content-between mt-3">
            <span className="text-center">
              Lối vào<i class="fa-solid fa-arrow-down"></i>
            </span>
            <ul className="seat">
              {dataSingleSeat()}
              {dataDoubleSeat()}
            </ul>
          </div>
          <div style={{ marginLeft: "35px", marginBottom: "10px" }}>
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
            className="btn btn-success w-75 d-flex justify-content-center"
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
          className="d-flex flex-column w-25"
          style={{ margin: "0 auto", marginTop: "50px" }}
        >
          <img src={props.data.film.img} className="" alt="" />
          <span className="text-center text-light fs-5 bg-danger p-4 rounded-bottom">
            Tổng tiền: {price}
          </span>
        </div>
      </div>
    );
  } catch (error) {
    prev();
  }
}
