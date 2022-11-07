import React from "react";
import Axios from "axios";
import Logo from "../../imgs/logo.png";
import QR_Zalo from "../../imgs/qr_zalo.jpg";
import QR_MoMo from "../../imgs/qr_momo.png";
import "../../styles/invoice.scss";
import CurrencyFormat from "react-currency-format";
import Toast from "../Toast";
import ToastUtils from "../../utils/ToastUtils";
import ReserveString from "../../utils/ReserveString";
import FormatTime from "../../utils/FormatTime";

export default function Invoice() {
  if (window.performance) {
    if (performance.navigation.type == 1) {
      window.location.href = "/";
    }
  }
  const [priceDiscount, setPriceDiscount] = React.useState(0);
  const [theater, setTheater] = React.useState({});
  const [textToast, setTextToast] = React.useState("");
  const [countSeat, setCountSeat] = React.useState({});
  const [infoUser, setInfoUser] = React.useState({});
  const [listSeat, setListSeat] = React.useState([]);
  const [invoiceLasted, setInvoiceLasted] = React.useState({});
  React.useEffect(() => {
    Axios.get(
      `https://vostro-cinema.herokuapp.com/user/findPhoneNumberAndEmailUserById/${localStorage.getItem(
        "id"
      )}`
    ).then((response) => {
      setInfoUser(response.data[0]);
    });
  }, []);
  React.useEffect(() => {
    Axios.get(
      `https://vostro-cinema.herokuapp.com/user/findProvisionalInvoiceLasted`
    ).then((response) => {
      setInvoiceLasted(response.data[0]);
      if (localStorage.getItem("id")) {
        setPriceDiscount(response.data[0].price * 0.01);
      }
      var count = 0;
      var listNameSingleSeat = [];
      var listNameDoubleSeat = [];
      for (var i = 0; i < response.data[0].seat.length; i++) {
        if (response.data[0].seat[i].includes("F")) {
          listNameDoubleSeat.push(response.data[0].seat[i]);
          count = count + 1;
        } else {
          listNameSingleSeat.push(response.data[0].seat[i]);
        }
      }
      setCountSeat({
        ["singleSeat"]: response.data[0].seat.length - count,
        ["doubleSeat"]: count,
        ["listNameSingleSeat"]: listNameSingleSeat.toString(),
        ["listNameDoubleSeat"]: listNameDoubleSeat.toString(),
      });
    });
  }, []);

  React.useEffect(() => {
    Axios.get("https://vostro-cinema.herokuapp.com/admin/getChairService").then(
      (response) => {
        setListSeat(response.data[0]);
      }
    );
  }, []);
  React.useEffect(() => {
    invoiceLasted &&
      Axios.get(
        `https://vostro-cinema.herokuapp.com/admin/getOneTheaterById/${invoiceLasted.theaterId}`
      ).then((response) => {
        setTheater(response.data[0]);
      });
  }, [invoiceLasted]);
  const date = new Date();
  const createdTime = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // /user/officialInvoiceById/:id
  const Submit = () => {
    Axios.put(
      `https://vostro-cinema.herokuapp.com/user/officialInvoiceById/${invoiceLasted._id}`,
      {
        price: invoiceLasted.price - priceDiscount,
      }
    )
      .then(function (response) {
        setTextToast("Thanh toán thành công");
        ToastUtils("success");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch(function (error) {
        setTextToast("Thanh toán thất bại");
        ToastUtils("fail");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      });
  };

  try {
    return (
      <>
        <section className="back">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="invoice-wrapper">
                  <div className="invoice-top">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="invoice-top-left">
                          <h2>
                            {localStorage.getItem("name") || "Khách hàng"}
                          </h2>
                          {infoUser && (
                            <>
                              <h3>{infoUser.phoneNumber}</h3>
                              <h3>{infoUser.email}</h3>
                            </>
                          )}

                          <h3>{createdTime}</h3>
                          <h2>Thông tin suất chiếu</h2>

                          <h3>Tên rạp: {theater.name}</h3>
                          <h3>Địa chỉ rạp: {theater.address}</h3>
                          <h3>Tên phòng: {invoiceLasted.roomName}</h3>

                          <h3>
                            Ngày giờ:{" "}
                            {ReserveString(invoiceLasted.showtime.slice(0, 10))}{" "}
                            - {FormatTime(invoiceLasted.showtime.slice(11))}
                          </h3>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="invoice-top-right">
                          <img src={Logo} className="w-50 float-end" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-bottom">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="task-table-wrapper">
                          <table className="table text-center">
                            <thead>
                              <tr>
                                <th>CHI TIẾT</th>
                                <th>SỐ LƯỢNG</th>
                                <th>TỔNG TIỀN</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="desc">
                                  <h3>Vé xem phim</h3>
                                  <h5>
                                    Bao gồm: {countSeat.singleSeat} ghế đơn (
                                    {countSeat.listNameSingleSeat}) và{" "}
                                    {countSeat.doubleSeat} ghế đôi (
                                    {countSeat.listNameDoubleSeat})
                                  </h5>
                                </td>
                                <td>
                                  <h4>{invoiceLasted.seat.length}</h4>
                                </td>

                                <td>
                                  <h4>
                                    <CurrencyFormat
                                      value={
                                        countSeat.singleSeat *
                                          listSeat.chair[0].price +
                                        countSeat.doubleSeat *
                                          listSeat.chair[1].price
                                      }
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      thousandSpacing={3}
                                    />
                                  </h4>
                                </td>
                              </tr>
                              <tr>
                                <td className="desc">
                                  <h3>Dịch vụ</h3>
                                  <h5>
                                    <ul
                                      style={{
                                        listStyle: "none",
                                        padding: 0,
                                      }}
                                    >
                                      {invoiceLasted.service.map((item) => {
                                        return (
                                          <li>{`${item.name}: ${item.quantity}`}</li>
                                        );
                                      })}
                                    </ul>
                                  </h5>
                                </td>
                                <td>
                                  <h4>{invoiceLasted.service.length}</h4>
                                </td>
                                <td>
                                  <h4>
                                    {" "}
                                    <CurrencyFormat
                                      value={
                                        invoiceLasted.price -
                                        (countSeat.singleSeat *
                                          listSeat.chair[0].price +
                                          countSeat.doubleSeat *
                                            listSeat.chair[1].price)
                                      }
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      thousandSpacing={3}
                                    />
                                  </h4>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="col-md-12">
                        <div className="invoice-bottom-total row">
                          <div className="col-sm-8 no-padding">
                            <div className="sub-total-box">
                              <h5>VÉ + DỊCH VỤ</h5>
                              <h6>
                                <CurrencyFormat
                                  value={invoiceLasted.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  thousandSpacing={3}
                                />
                              </h6>
                            </div>
                            <div className="add-box">
                              <h3>-</h3>
                            </div>
                            <div className="tax-box">
                              <h5>THÀNH VIÊN HỆ THỐNG*</h5>
                              <h6>
                                <CurrencyFormat
                                  value={priceDiscount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  thousandSpacing={3}
                                />
                              </h6>
                            </div>
                          </div>
                          <div className="col-sm-4 no-padding">
                            <div className="total-box">
                              <h6>TỔNG TIỀN</h6>
                              <h3>
                                <CurrencyFormat
                                  value={invoiceLasted.price - priceDiscount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  thousandSpacing={3}
                                />
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="col-xs-12">
                        <hr className="divider"></hr>
                      </div>
                      <div className="col-sm-12">
                        <h6 className="text-left">
                          *Giảm 1% khi đăng nhập vào hệ thống
                        </h6>
                      </div>
                    </div>
                    <div className="bottom-bar"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* QR */}
        <div className="bg-light w-75 rounded-2" style={{ margin: "0 auto" }}>
          <div className="p-4 text-center">
            <div className=" d-flex justify-content-around ">
              <div>
                <img
                  src={QR_Zalo}
                  className="rounded-4"
                  style={{ width: "540px", height: "504px" }}
                  alt=""
                />
                <h5 className="py-3">Vào ví ZALOPAY quét mã để thanh toán</h5>
              </div>
              <div>
                <img
                  src={QR_MoMo}
                  className="rounded-4"
                  style={{ width: "540px", height: "504px" }}
                  alt=""
                />
                <h5 className="py-3">Vào ví MOMO quét mã để thanh toán</h5>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-success w-75"
              onClick={Submit}
            >
              Thanh toán thành công
            </button>
          </div>
          <Toast text={textToast} bg="bg-danger" id="fail" />
          <Toast text={textToast} bg="bg-success" id="success" />
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
