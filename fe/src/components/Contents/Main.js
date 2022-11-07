import React from "react";
import Test from "../../imgs/test-1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookSeat, BookService, BookTicket } from "../Book";
import Poster from "../../imgs/bdts_main-poster_vi_print_1_.jpg";
import Axios from "axios";

export default function Main() {
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
      (response) => setListFilms(response.data)
    );
  }, []);
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
          className="d-flex justify-content-center text-white ul-state-fimls bg-light w-50 rounded-2"
          style={{ margin: "50px auto 20px", listStyleType: "none" }}
        >
          <li className="m-2 fs-2 text-success">TẤT CẢ PHIM TRÊN HỆ THỐNG</li>
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
  );
}
