import React from "react";
import Axios from "axios";
import CurrencyFormat from "react-currency-format";
import Toast from "../../Toast";
import ToastUtils from "../../../utils/ToastUtils";
import ManagerFoodAndDrink from "./ManagerFoodAndDrink";
export default function ManagerPriceOfTicket() {
  const [check, setCheck] = React.useState(0);
  const [listService, setListService] = React.useState([]);
  const [priceSingle, setPriceSingle] = React.useState(0);
  const [priceDouble, setPriceDouble] = React.useState([]);
  const [textToast, setTextToast] = React.useState("");

  React.useEffect(() => {
    Axios.get("https://vostro-cinema.herokuapp.com/admin/getChairService").then(
      (response) => {
        setListService(response.data);
      }
    );
  }, [check]);

  //Pass to children component
  const sendToast = (val) => {
    setTextToast(val);
    ToastUtils("success");
  };

  const handleUpdatePrice = (str) => {
    var price = priceSingle;
    if (str == "double") {
      price = priceDouble;
    }
    Axios.put(
      `https://vostro-cinema.herokuapp.com/admin/updateChairServiceByName/${str}`,
      {
        name: str,
        price: price,
      }
    )
      .then(function (response) {
        setTextToast("Cập nhật thành công");
        ToastUtils("success");
        setCheck(Math.random());
      })
      .catch(function (error) {});
  };
  return (
    <div className="bg-light">
      <div className="w-75 text-center p-4" style={{ margin: "0 auto" }}>
        <h3 className="text-success">QUẢN LÝ GIÁ VÉ</h3>

        <div className="row pb-4">
          <div className="col-md-6">
            <i className="fa-solid fa-couch" style={{ fontSize: "200px" }}></i>
            {listService[0] && (
              <h3 className="text-success">
                <CurrencyFormat
                  prefix={"Giá vé ghế đơn là: "}
                  value={listService[0].chair[0].price}
                  displayType={"text"}
                  thousandSeparator={true}
                  thousandSpacing={3}
                  suffix={" VND"}
                />
              </h3>
            )}
            <div
              className="d-flex w-50 justify-content-center"
              style={{ margin: "0 auto" }}
            >
              <input
                type="number"
                className="form-control w-50 me-2"
                onChange={(e) => setPriceSingle(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={(e) => handleUpdatePrice("single")}
              >
                Cập nhật
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <i
                className="fa-solid fa-couch"
                style={{ fontSize: "200px" }}
              ></i>
              <i
                className="fa-solid fa-couch"
                style={{ fontSize: "200px", transform: "translateX(-60px)" }}
              ></i>
            </div>
            {listService[0] && (
              <h3 className="text-success">
                <CurrencyFormat
                  prefix={"Giá vé ghế đôi là: "}
                  value={listService[0].chair[1].price}
                  displayType={"text"}
                  thousandSeparator={true}
                  thousandSpacing={3}
                  suffix={" VND"}
                />
              </h3>
            )}
            <div className="d-flex w-50" style={{ margin: "0 auto" }}>
              <input
                type="number"
                className="form-control w-50 me-2"
                onChange={(e) => setPriceDouble(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={(e) => handleUpdatePrice("double")}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 p-4" style={{ margin: "0 auto" }}>
        <ManagerFoodAndDrink sendToast={sendToast} />
      </div>
      <Toast text={textToast} bg="bg-danger" id="fail" />
      <Toast text={textToast} bg="bg-success" id="success" />
    </div>
  );
}
