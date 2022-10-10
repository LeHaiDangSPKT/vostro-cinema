import React from "react";
import Axios from "axios";
import CurrencyFormat from "react-currency-format";

export default function ManagerTicket() {
  const [listService, setListService] = React.useState([]);
  const [priceOfSingleChair, setPriceOfSingleChair] = React.useState(0);
  const [priceOfDoubleChair, setPriceOfDoubleChair] = React.useState(0);
  const [priceSingle, setPriceSingle] = React.useState(0);
  const [priceDouble, setPriceDouble] = React.useState(0);

  React.useEffect(() => {
    Axios.get("http://localhost:5000/admin/getChairService").then(
      (response) => {
        // listService = response.data;
        setListService(response.data);
        // setPriceOfSingleChair(response.data[0].chair[0].price);
        // setPriceOfDoubleChair(response.data[0].chair[1].price);
      }
    );
  }, []);
  Object.values(listService).map((item) => {
    if (item.chair[0].name == "don") {
      console.log(item.chair[0].price);
    }
  });

  return (
    <div className="bg-light">
      <div className="w-75 text-center p-4" style={{ margin: "0 auto" }}>
        <h3 className="text-success">CHỈNH SỬA GIÁ VÉ</h3>

        <div className="row pb-4">
          <div className="col-md-6">
            <i class="fa-solid fa-couch" style={{ fontSize: "200px" }}></i>
            <h3 className="text-success">
              <CurrencyFormat
                prefix={"Giá vé ghế đơn là: "}
                value={priceOfSingleChair}
                displayType={"text"}
                thousandSeparator={true}
                thousandSpacing={3}
                suffix={" VND"}
              />
            </h3>
            <div className="d-flex w-50" style={{ margin: "0 auto" }}>
              <input
                type="text"
                className="form-control w-50 me-2"
                // onChange={(e) => setPriceSingle(e.target.value)}
              />
              <button
                className="btn btn-success"
                // onClick={(e) => handleUpdatePrice("don")}
              >
                Cập nhật
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <i class="fa-solid fa-couch" style={{ fontSize: "200px" }}></i>
              <i
                class="fa-solid fa-couch"
                style={{ fontSize: "200px", transform: "translateX(-60px)" }}
              ></i>
            </div>
            <h3 className="text-success">
              <CurrencyFormat
                prefix={"Giá vé ghế đôi là: "}
                // value={listService[0].chair[1].price}
                displayType={"text"}
                thousandSeparator={true}
                thousandSpacing={3}
                suffix={" VND"}
              />
            </h3>
            <div className="d-flex w-50" style={{ margin: "0 auto" }}>
              <input
                type="text"
                className="form-control w-50 me-2"
                // onChange={(e) => setPriceDouble(e.target.value)}
              />
              <button
                className="btn btn-success"
                // onClick={(e) => handleUpdatePrice("don")}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
