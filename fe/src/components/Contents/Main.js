import React from "react";
import Test from "../../imgs/test-1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookSeat, BookService, BookTicket } from "../Book";
import Search from "../Search";
import Poster from "../../imgs/bdts_main-poster_vi_print_1_.jpg";

export default function Main() {
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
  return (
    <>
      {/* Poster khuyến mãi */}
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner" style={{ height: "300px" }}>
          <div class="carousel-item active">
            <img src={Test} class="d-block w-100" alt="..."></img>
          </div>
          <div class="carousel-item">
            <img src={Test} class="d-block w-100" alt="..."></img>
          </div>
          <div class="carousel-item">
            <img src={Test} class="d-block w-100" alt="..."></img>
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
          <div class="card">
            <div className="poster-film">
              <img src={Poster} class="card-img-top" alt="..."></img>
            </div>
            <div className="overlay">
              <div class="card-body">
                <h5 class="card-title">Bỗng dưng trúng số</h5>
                <p class="card-text">
                  1 cơn gió vô duyên vô tình thổi bay tờ vé số trúng độc đắc
                  vượt qua ranh giới 2 nước, hành trình tìm lại tờ vé số đầy bất
                  ổn của những anh lính Nam - Bắc , cùng cuộc chạm trán ko hề
                  căng thẳng mà siêu hài hước...
                </p>
                <div className="d-flex justify-content-center">
                  <a
                    href="#"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#trailerModal"
                    style={{ width: "90px", margin: "3px" }}
                  >
                    Xem
                  </a>
                  <a
                    href="/buy-ticket"
                    class="btn btn-success"
                    style={{ width: "90px", margin: "3px" }}
                  >
                    Đặt vé
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <img src="..." class="card-img-top" alt="..."></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card">
            <img src="..." class="card-img-top" alt="..."></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card">
            <img src="..." class="card-img-top" alt="..."></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card">
            <img src="..." class="card-img-top" alt="..."></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card">
            <img src="..." class="card-img-top" alt="..."></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">
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
        <Slider {...settingsBook} className="d-flex justify-content-between">
          <BookTicket />
          <BookSeat />
          <BookService />
        </Slider>
      </div>

      {/* Modal Trailer */}
      <div 
        class="modal fade"
        id="trailerModal"
        tabindex="-1"
        aria-labelledby="trailerModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "594px" }}
        >
          <div class="modal-content">
            <div class="modal-body">
              <iframe
                width="560"
                height="330"
                src="https://www.youtube.com/embed/D3KbO3QF-lg"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
