import React from "react";
import Test from "../../imgs/test-1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookSeat, BookService, BookTicket } from "../Book";
import Search from "../Search";
import Poster from "../../imgs/bdts_main-poster_vi_print_1_.jpg";
import Axios from "axios";

export default function Main() {
  const [data, setData] = React.useState({});
  const liStateFilms = document.getElementsByClassName("state-film");
  const changeColor = (e) => {
    e.currentTarget.classList.add("custom-hover-active");
    Object.values(liStateFilms)
      .filter((item) => item != e.currentTarget)
      .map((item) => {
        if (item.className.includes("custom-hover-active")) {
          item.classList.remove("custom-hover-active");
        }
      });
  };
  // Slick
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  const settingsListFilms = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settingsBook = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: false,
    nextArrow: <br />,
    prevArrow: <br />,
  };

  const setDataFromChildComponent = (data) => {
    setData(data);
    if (data.service.length > 0) {
      Axios.post("http://localhost:5000/user/provisionalInvoice", {
        userId: localStorage.getItem("id") || "",
        filmId: data.film.id,
        filmName: data.film.name,
        theaterId: data.theaterId,
        showtime: data.date + "-" + data.time,
        price: data.price,
        seat: data.seat,
        roomName: data.roomName,
        service: data.service,
      })
        .then(function (response) {
          window.location.href = "/me/invoice";
        })
        .catch(function (error) {
          window.location.href = "/";
        });
    }
  };

  return (
    <>
      {/* Poster khuyến mãi */}
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" style={{ height: "300px" }}>
          <div className="carousel-item active">
            <img src={Test} className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src={Test} className="d-block w-100" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src={Test} className="d-block w-100" alt="..."></img>
          </div>
        </div>
      </div>

      {/* State films */}
      <div>
        <ul
          className="d-flex justify-content-center text-white fs-5 ul-state-fimls"
          style={{ margin: "0 auto", listStyleType: "none" }}
        >
          <li
            className="m-4 custom-hover state-film custom-hover-active"
            onClick={(e) => {
              changeColor(e);
            }}
          >
            PHIM ĐANG CHIẾU
          </li>
          <li
            className="m-4 custom-hover state-film"
            onClick={(e) => {
              changeColor(e);
            }}
          >
            PHIM SẮP CHIẾU
          </li>
        </ul>
      </div>

      {/* List phim theo state */}
      <div className="w-75" style={{ margin: "0 auto" }}>
        <Slider
          {...settingsListFilms}
          className="d-flex justify-content-between"
        >
          <div className="card">
            <div className="poster-film">
              <img src={Poster} className="card-img-top" alt="..."></img>
            </div>
            <div className="overlay">
              <div className="card-body">
                <h5 className="card-title">Bỗng dưng trúng số</h5>
                <p className="card-text">
                  1 cơn gió vô duyên vô tình thổi bay tờ vé số trúng độc đắc
                  vượt qua ranh giới 2 nước, hành trình tìm lại tờ vé số đầy bất
                  ổn của những anh lính Nam - Bắc , cùng cuộc chạm trán ko hề
                  căng thẳng mà siêu hài hước...
                </p>
                <div className="d-flex justify-content-center">
                  <a
                    href="#"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#trailerModal"
                    style={{ width: "90px", margin: "3px" }}
                  >
                    Xem
                  </a>
                  <a
                    href="/buy-ticket"
                    className="btn btn-success"
                    style={{ width: "90px", margin: "3px" }}
                  >
                    Đặt vé
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <img src="..." className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card">
            <img src="..." className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card">
            <img src="..." className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card">
            <img src="..." className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card">
            <img src="..." className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </Slider>
      </div>

      {/* Search */}
      <Search />

      {/* Đặt vé */}
      <div className="w-75" style={{ margin: "0 auto" }}>
        <Slider {...settingsBook}>
          <BookTicket setData={setDataFromChildComponent} />
          <BookSeat setData={setDataFromChildComponent} data={data} />
          <BookService setData={setDataFromChildComponent} data={data} />
        </Slider>
      </div>

      {/* Modal Trailer */}
      <div
        className="modal fade"
        id="trailerModal"
        tabIndex="-1"
        aria-labelledby="trailerModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "594px" }}
        >
          <div className="modal-content">
            <div className="modal-body">
              <iframe
                width="560"
                height="330"
                src="https://www.youtube.com/embed/D3KbO3QF-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
