import React from "react";
import BookSeat from "../Book/BookSeat";
import Slider from "react-slick";
import BookTicket from "../Book/BookTicket";
import BookService from "../Book/BookService";
export default function BuyTicket() {
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
      <div style={{ margin: "0 auto" }}>
        <Slider {...settingsBook} className="d-flex justify-content-between">
          <BookTicket />
          <BookSeat />
          <BookService />
        </Slider>
      </div>
    </>
  );
}
