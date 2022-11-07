import React from "react";
import KM0 from "../../imgs/KM0.jpg";
import KM1 from "../../imgs/KM1.jpg";
import KM3 from "../../imgs/KM3.jpg";
import KM2 from "../../imgs/KM2.png";
import KM4 from "../../imgs/KM4.png";
import KM5 from "../../imgs/KM5.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookSeat, BookService, BookTicket } from "../Book";
import Axios from "axios";
import LoadingPage from "../../utils/LoadingPage";

export default function Main() {
  const [pageLoading, setPageLoading] = React.useState(true);
  const [linkTrailer, setLinkTrailer] = React.useState("");
  const [data, setData] = React.useState({});
  const [listFilms, setListFilms] = React.useState([]);
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
  const settingsListBanner = {
    infinite: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
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
      Axios.post(
        "https://vostro-cinema.herokuapp.com/user/provisionalInvoice",
        {
          userId: localStorage.getItem("id") || "",
          filmId: data.film.id,
          filmName: data.film.name,
          theaterId: data.theaterId,
          showtime: data.date + "-" + data.time,
          price: data.price,
          seat: data.seat,
          roomName: data.roomName,
          service: data.service,
        }
      )
        .then(function (response) {
          window.location.href = "/me/invoice";
        })
        .catch(function (error) {
          window.location.href = "/";
        });
    }
  };

  React.useEffect(() => {
    Axios.get("https://vostro-cinema.herokuapp.com/admin/getAllFilms").then(
      (response) => {
        setListFilms(response.data);
        setPageLoading(false);
      }
    );
  }, []);
  return (
    <>
      {pageLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="w-100 mt-4">
            <Slider {...settingsListBanner} className="">
              {[KM0, KM1, KM2, KM3, KM4, KM5].map((item) => {
                return (
                  <div className="carousel-item active">
                    <img src={item} className="d-block w-100" alt="..."></img>
                  </div>
                );
              })}
            </Slider>
          </div>

          {/* State films */}
          <div>
            <ul
              className="d-flex justify-content-center text-white ul-state-fimls bg-light w-50 rounded-2"
              style={{ margin: "50px auto 20px", listStyleType: "none" }}
            >
              <li className="m-2 fs-2 text-success fw-bolder">
                TẤT CẢ PHIM TRÊN HỆ THỐNG
              </li>
            </ul>
          </div>

          {/* List phim theo state */}
          <div className="w-75" style={{ margin: "0 auto" }}>
            <Slider {...settingsListFilms} className="">
              {listFilms.map((item) => {
                return (
                  <div className="card" key={item._id}>
                    <div className="poster-film">
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "400px" }}
                      ></img>
                    </div>
                    <div className="overlay">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.describe}</p>
                        <div className="text-center">
                          <a
                            href="#"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#trailerModal"
                            onClick={(e) => setLinkTrailer(item.trailer)}
                          >
                            Xem trailer
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
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
            class="modal fade"
            id="trailerModal"
            tabindex="-1"
            aria-labelledby="trailerModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
          >
            <div
              class="modal-dialog modal-dialog-centered"
              style={{ maxWidth: "594px" }}
            >
              <div class="modal-content">
                <div class="modal-header" style={{ padding: `15px 20px 0px;` }}>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <iframe
                    width="560"
                    height="330"
                    src={`https://www.youtube.com/embed/${linkTrailer}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
