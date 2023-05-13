import React from "react";
import Axios from "axios";
import ReserveString from "../../utils/ReserveString";
import CurrencyFormat from "react-currency-format";
import LoadingPage from "../../utils/LoadingPage";

export default function History() {
  const [loading, setLoading] = React.useState(true);
  const [listBill, setListBill] = React.useState([]);
  React.useEffect(() => {
    Axios.get(
      `${
        process.env.REACT_APP_API
      }/user/findBillByUserById/${localStorage.getItem("id")}`
    ).then((response) => {
      setListBill(response.data);
      setLoading(false);
    });
  }, []);
  try {
    return (
      <>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="bg-light w-75 rounded-2" style={{ margin: "0 auto" }}>
            <div className="p-4">
              <h3 className="text-center text-success mt-2">
                Lịch sử giao dịch của bạn
              </h3>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="table__header" scope="col">
                      #
                    </th>
                    <th className="table__header" scope="col">
                      Mã hoá đơn
                    </th>
                    <th className="table__header" scope="col">
                      Tên phim
                    </th>
                    <th className="table__header" scope="col">
                      Giá tiền
                    </th>
                    <th className="table__header" scope="col">
                      Ngày xuất hoá đơn
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listBill.map((item, index) => {
                    return (
                      <tr className="table__row" key={item._id}>
                        <th>{index + 1}</th>
                        <td>{item._id}</td>
                        <td>{item.filmName}</td>
                        <td>
                          {" "}
                          <CurrencyFormat
                            value={item.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            thousandSpacing={"3"}
                          />
                        </td>
                        <td>{ReserveString(item.updatedAt.slice(0, 10))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
