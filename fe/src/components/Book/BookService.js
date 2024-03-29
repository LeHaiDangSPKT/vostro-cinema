import * as React from "react";
import Axios from "axios";
import Popcorn from "../../imgs/popcorn.png";
import Monster from "../../imgs/drink-1.png";
import Pepsi from "../../imgs/drink-2.png";
import Redbull from "../../imgs/drink-3.png";
import CurrencyFormat from "react-currency-format";
import $ from "jquery";

export default function BookService(props) {
  var service = [];
  const [totalPriceService, setTotalPriceService] = React.useState(0);
  const [price, setPrice] = React.useState({
    baprangbo: 0,
    bapcaramel: 0,
    bapphomai: 0,
    monster: 0,
    pepsi: 0,
    redbull: 0,
  });
  const [menu, setMenu] = React.useState({
    baprangbo: 0,
    bapcaramel: 0,
    bapphomai: 0,
    monster: 0,
    pepsi: 0,
    redbull: 0,
  });
  React.useEffect(() => {
    Axios.get(process.env.REACT_APP_API + "/admin/getMenuService").then(
      (response) => {
        setMenu({
          baprangbo: response.data[0].menu[0].price,
          bapcaramel: response.data[0].menu[1].price,
          bapphomai: response.data[0].menu[2].price,
          monster: response.data[0].menu[3].price,
          pepsi: response.data[0].menu[4].price,
          redbull: response.data[0].menu[5].price,
        });
      }
    );
  }, []);
  React.useEffect(() => {
    setTotalPriceService(
      Object.values(price).reduce((partialSum, a) => partialSum + a, 0)
    );
  }, [price]);
  const ChangeQuantity = (e, prices, name) => {
    if (e.target.value.length == 0) {
      setPrice({ ...price, [name]: 0 });
    } else {
      if ("0" <= e.target.value && e.target.value <= "9" && +e.target.value) {
        setPrice({ ...price, [name]: prices * +e.target.value });
      }
    }
  };
  const Submit = () => {
    var name = $("h5[class*='service']");
    var quantity = $("input[class*='quantity']");
    for (var i = 0; i < name.length; i++) {
      if (+quantity[i].value) {
        service.push({
          name: name[i].outerText,
          quantity: +quantity[i].value,
        });
      }
    }
    props.setData({
      ...props.data,
      price: totalPriceService + props.data.price,
      service: service,
      complete: true,
    });
  };

  try {
    return (
      <div className="bg-light rounded-3 p-4 mt-4 d-flex justify-content-between">
        <div className="w-75 me-4 rs-w-100 rs-m-0-auto">
          <h3
            className="text-center text-success mb-0 rs-m-0-auto"
            style={{ marginLeft: "137px" }}
          >
            ĐẶT MÓN
          </h3>

          <div className="d-flex justify-content-between flex-column ">
            {/* Chọn đồ ăn */}
            <div className="d-flex mt-4 rs-flex-column">
              <h5 className="me-3 text-center rs-hide">Chọn đồ ăn</h5>
              <div
                className="d-flex justify-content-between mx-1 rs-mt-10"
                style={{ height: "280px" }}
              >
                <div className="bg-warning py-1 px-3 d-flex justify-content-center flex-column rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1 service-baprangbo">
                    Bắp rang bơ
                  </h5>
                  <div className="d-flex justify-content-center ">
                    <img
                      src={Popcorn}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  </div>
                  <h6 className="text-center bg-light py-2 rounded-2">
                    <CurrencyFormat
                      prefix={"Giá: "}
                      value={menu.baprangbo}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandSpacing={"3"}
                      suffix={" VND"}
                    />
                  </h6>
                  <div className="mt-2">
                    <label className="w-50">Số lượng:</label>
                    <input
                      type="text"
                      min={0}
                      value={price.baprangbo / menu.baprangbo}
                      onChange={(e) =>
                        ChangeQuantity(e, menu.baprangbo, "baprangbo")
                      }
                      className="w-50 border rounded-2 text-center quantity-food"
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mx-1 rs-mt-10"
                style={{ height: "280px" }}
              >
                <div className="bg-warning py-1 px-3 d-flex justify-content-center flex-column rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1 service-bapcaramel">
                    Bắp Caramel
                  </h5>
                  <div className="d-flex justify-content-center ">
                    <img
                      src={Popcorn}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  </div>
                  <h6 className="text-center bg-light py-2 rounded-2">
                    <CurrencyFormat
                      prefix={"Giá: "}
                      value={menu.bapcaramel}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandSpacing={"3"}
                      suffix={" VND"}
                    />
                  </h6>
                  <div className="mt-2">
                    <label className="w-50">Số lượng:</label>
                    <input
                      type="text"
                      min={0}
                      value={price.bapcaramel / menu.bapcaramel}
                      onChange={(e) =>
                        ChangeQuantity(e, menu.bapcaramel, "bapcaramel")
                      }
                      className="w-50 border rounded-2 text-center quantity-food"
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mx-1 rs-mt-10"
                style={{ height: "280px" }}
              >
                <div className="bg-warning py-1 px-3 d-flex justify-content-center flex-column rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1 service-bapphomai">
                    Bắp phô mai
                  </h5>
                  <div className="d-flex justify-content-center ">
                    <img
                      src={Popcorn}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  </div>
                  <h6 className="text-center bg-light py-2 rounded-2">
                    <CurrencyFormat
                      prefix={"Giá: "}
                      value={menu.bapphomai}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandSpacing={"3"}
                      suffix={" VND"}
                    />
                  </h6>
                  <div className="mt-2">
                    <label className="w-50">Số lượng:</label>
                    <input
                      type="text"
                      min={0}
                      value={price.bapphomai / menu.bapphomai}
                      onChange={(e) =>
                        ChangeQuantity(e, menu.bapphomai, "bapphomai")
                      }
                      className="w-50 border rounded-2 text-center quantity-food"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Chọn nước uống */}
            <div className="d-flex mt-4 rs-flex-column ">
              <h5
                className="rs-hide"
                style={{ marginRight: "22px", textAlign: "center" }}
              >
                Chọn nước
              </h5>
              <div
                className="d-flex justify-content-between mx-1 rs-mt-10"
                style={{ height: "280px" }}
              >
                <div className="bg-warning py-1 px-3 d-flex justify-content-center flex-column rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1 service-monster">
                    Monster
                  </h5>
                  <div className="d-flex justify-content-center ">
                    <img
                      src={Monster}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  </div>
                  <h6 className="text-center bg-light py-2 rounded-2">
                    <CurrencyFormat
                      prefix={"Giá: "}
                      value={menu.monster}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandSpacing={"3"}
                      suffix={" VND"}
                    />
                  </h6>
                  <div className="mt-2">
                    <label className="w-50">Số lượng:</label>
                    <input
                      type="text"
                      min={0}
                      value={price.monster / menu.monster}
                      onChange={(e) =>
                        ChangeQuantity(e, menu.monster, "monster")
                      }
                      className="w-50 border rounded-2 text-center quantity-drink"
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mx-1 rs-mt-10"
                style={{ height: "280px" }}
              >
                <div className="bg-warning py-1 px-3 d-flex justify-content-center flex-column rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1 service-pepsi">
                    Pepsi
                  </h5>
                  <div className="d-flex justify-content-center ">
                    <img
                      src={Pepsi}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  </div>
                  <h6 className="text-center bg-light py-2 rounded-2">
                    <CurrencyFormat
                      prefix={"Giá: "}
                      value={menu.pepsi}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandSpacing={"3"}
                      suffix={" VND"}
                    />
                  </h6>
                  <div className="mt-2">
                    <label className="w-50">Số lượng:</label>
                    <input
                      type="text"
                      min={0}
                      value={price.pepsi / menu.pepsi}
                      onChange={(e) => ChangeQuantity(e, menu.pepsi, "pepsi")}
                      className="w-50 border rounded-2 text-center quantity-drink"
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mx-1 rs-mt-10"
                style={{ height: "280px" }}
              >
                <div className="bg-warning py-1 px-3 d-flex justify-content-center flex-column rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1 service-redbull">
                    RedBull
                  </h5>
                  <div className="d-flex justify-content-center ">
                    <img
                      src={Redbull}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  </div>
                  <h6 className="text-center bg-light py-2 rounded-2">
                    <CurrencyFormat
                      prefix={"Giá: "}
                      value={menu.redbull}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandSpacing={"3"}
                      suffix={" VND"}
                    />
                  </h6>
                  <div className="mt-2">
                    <label className="w-50">Số lượng:</label>
                    <input
                      type="text"
                      min={0}
                      value={price.redbull / menu.redbull}
                      onChange={(e) =>
                        ChangeQuantity(e, menu.redbull, "redbull")
                      }
                      className="w-50 border rounded-2 text-center quantity-drink"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-success w-75 mt-2 d-flex justify-content-center rs-m-0-auto rs-mt-10"
            style={{ marginLeft: "137px" }}
            onClick={Submit}
          >
            Thanh toán
          </button>
        </div>
        <div
          className="d-flex flex-column w-25"
          style={{ margin: "50px auto 0px" }}
        >
          <img src={props.data.film.img} className="" alt="" />
          <span className="text-center text-light fs-5 bg-danger p-4 rounded-bottom">
            <CurrencyFormat
              prefix={"Tổng tiền: "}
              value={totalPriceService + props.data.price}
              displayType={"text"}
              thousandSeparator={true}
              thousandSpacing={"3"}
              suffix={" VND"}
            />
          </span>
        </div>
      </div>
    );
  } catch (error) {}
}
