import React from "react";
import Popcorn from "../../../imgs/popcorn.png";
import Monster from "../../../imgs/drink-1.png";
import Pepsi from "../../../imgs/drink-2.png";
import Redbull from "../../../imgs/drink-3.png";
import Axios from "axios";
import $ from "jquery";

export default function ManagerFoodAndDrink(props) {
  const [check, setCheck] = React.useState("");
  const [menu, setMenu] = React.useState({
    baprangbo: 0,
    bapcaramel: 0,
    bapphomai: 0,
    monster: 0,
    pepsi: 0,
    redbull: 0,
  });

  React.useEffect(() => {
    Axios.get("https://vostro-cinema.herokuapp.com/admin/getMenuService").then(
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
  }, [check]);
  const handleChange = (e) => {
    setMenu({ ...menu, [e.target.name]: e.target.value });
  };
  const EditInfo = (className, e) => {
    e.preventDefault();
    var input = $("input[id*='manager']");
    if (className === "edit-info") {
      $(".edit-info")[0].setAttribute("disabled", "");
      $(".update-info")[0].classList.remove("d-none");
      for (var i = 0; i < input.length; i++) {
        input[i].removeAttribute("disabled");
      }
      input[0].removeAttribute("disabled");
    } else {
      $(".edit-info")[0].removeAttribute("disabled");
      $(".update-info")[0].classList.add("d-none");
      for (var i = 0; i < input.length; i++) {
        input[i].setAttribute("disabled", "");
      }
      Axios.put(
        `https://vostro-cinema.herokuapp.com/admin/updateMenuService/`,
        {
          baprangbo: menu.baprangbo,
          bapcaramel: menu.bapcaramel,
          bapphomai: menu.bapphomai,
          monster: menu.monster,
          pepsi: menu.pepsi,
          redbull: menu.redbull,
        }
      )
        .then(function (response) {
          props.sendToast("Cập nhật thành công");
          setCheck(Math.random());
        })
        .catch(function (error) {});
    }
  };
  return (
    <div className="bg-light">
      <div className="w-75 p-4" style={{ margin: "0 auto" }}>
        <h3 className="text-center text-success mb-0 ">
          QUẢN LÝ ĐỒ ĂN VÀ NƯỚC UỐNG
        </h3>

        {menu && (
          <div className="d-flex justify-content-between flex-column ">
            {/* Chọn đồ ăn */}
            <div className="d-flex mt-4">
              <h5 className="me-3 text-center">Các loại đồ ăn: </h5>
              <div
                className="d-flex justify-content-between mx-1"
                style={{ height: "250px" }}
              >
                <div className="bg-warning py-1 px-3 rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1">
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
                  <div className="mt-2">
                    <label className="">Giá tiền:</label>
                    <input
                      id="manager-baprangbo"
                      disabled
                      name="baprangbo"
                      value={menu.baprangbo}
                      onChange={(e) => handleChange(e)}
                      type="number"
                      className="ms-2 border rounded-2 text-center"
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mx-1"
                style={{ height: "250px" }}
              >
                <div className="bg-warning py-1 px-3 rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1">
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
                  <div className="mt-2">
                    <label className="">Giá tiền:</label>
                    <input
                      id="manager-bapcaramel"
                      disabled
                      type="number"
                      name="bapcaramel"
                      value={menu.bapcaramel}
                      onChange={(e) => handleChange(e)}
                      className="ms-2 border rounded-2 text-center"
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mx-1"
                style={{ height: "250px" }}
              >
                <div className="bg-warning py-1 px-3 rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1">
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
                  <div className="mt-2">
                    <label className="">Giá tiền:</label>
                    <input
                      id="manager-bapphomai"
                      disabled
                      name="bapphomai"
                      value={menu.bapphomai}
                      onChange={(e) => handleChange(e)}
                      type="number"
                      className="ms-2 border rounded-2 text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Chọn nước uống */}
            <div className="d-flex mt-4">
              <h5 style={{ marginRight: "22px", textAlign: "center" }}>
                Các loại nước:
              </h5>
              <div
                className="d-flex justify-content-between mx-1"
                style={{ height: "250px" }}
              >
                <div className="bg-warning py-1 px-3 rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1">Monster</h5>
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
                  <div className="mt-2">
                    <label className="">Giá tiền:</label>
                    <input
                      id="manager-monster"
                      disabled
                      name="monster"
                      value={menu.monster}
                      onChange={(e) => handleChange(e)}
                      type="number"
                      className="ms-2 border rounded-2 text-center"
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mx-1"
                style={{ height: "250px" }}
              >
                <div className="bg-warning py-1 px-3 rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1">Pepsi</h5>
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
                  <div className="mt-2">
                    <label className="">Giá tiền:</label>
                    <input
                      id="manager-pepsi"
                      disabled
                      name="pepsi"
                      value={menu.pepsi}
                      onChange={(e) => handleChange(e)}
                      type="number"
                      className="ms-2 border rounded-2 text-center"
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mx-1"
                style={{ height: "250px" }}
              >
                <div className="bg-warning py-1 px-3 rounded-3">
                  <h5 className="text-dark text-center m-0 mt-1">RedBull</h5>
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
                  <div className="mt-2">
                    <label className="">Giá tiền:</label>
                    <input
                      id="manager-redbull"
                      disabled
                      name="redbull"
                      value={menu.redbull}
                      onChange={(e) => handleChange(e)}
                      type="number"
                      className="ms-2 border rounded-2 text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className="w-75 mt-3 d-flex justify-content-center"
          style={{ margin: "0 auto", transform: "translateX(50px)" }}
        >
          <button
            type="button"
            className="btn mx-1 w-75 btn-primary edit-info"
            onClick={(e) => EditInfo("edit-info", e)}
          >
            Sửa thông tin
          </button>
          <button
            type="submit"
            className="btn mx-1 w-75 btn-success update-info d-none"
            onClick={(e) => {
              EditInfo("update-info", e);
            }}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
