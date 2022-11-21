import React from "react";
import Axios from "axios";
import CurrencyFormat from "react-currency-format";
import LoadingPage from "../../../utils/LoadingPage";

export default function ManagerDashboard() {
  const [pageLoading, setPageLoading] = React.useState(true);
  const [quantityTicket, setQuantityTicket] = React.useState(0);
  const [year, setYear] = React.useState(0);
  const [theater, setTheater] = React.useState(0);
  const [dataYear, setDataYear] = React.useState([]);
  const [revenue, setRevenue] = React.useState(0);
  const [listOfTheater, setListOfTheater] = React.useState(0);

  React.useEffect(() => {
    Axios.get(process.env.REACT_APP_API + "/admin/getAllTheater").then(
      (response) => {
        setListOfTheater(response.data);
        setPageLoading(false);
      }
    );
    Axios.post(process.env.REACT_APP_API + "/admin/getAllYear").then(
      (response) => {
        setPageLoading(false);
        setDataYear(response.data);
      }
    );
  }, []);

  const Submit = () => {
    setPageLoading(true);
    Axios.post(
      `${process.env.REACT_APP_API}/admin/getAllBillByYearAndTheaterId/${theater}`,
      {
        year: year,
      }
    ).then((response) => {
      setQuantityTicket(response.data.length);
      var total = 0;
      response.data.map((item) => {
        total += item.price;
      });
      setRevenue(total);
      setPageLoading(false);
    });
  };
  try {
    return (
      <>
        {pageLoading ? (
          <LoadingPage />
        ) : (
          <div className="bg-light">
            <div className="w-75 p-4" style={{ margin: "0 auto" }}>
              <h3 className="text-center text-success mb-3 ">
                THỐNG KÊ DOANH THU
              </h3>
              <form>
                <div className="row">
                  <div className="col-md-5">
                    <label>Chọn rạp:</label>
                    <select
                      className="form-control"
                      id="type"
                      required
                      onChange={(e) => setTheater(e.target.value)}
                    >
                      <option value="">Choose...</option>
                      {listOfTheater.map((item) => {
                        return (
                          <option value={item._id} key={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-5">
                    <label>Chọn năm:</label>
                    <select
                      className="form-control"
                      id="type"
                      required
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">Choose...</option>
                      {dataYear.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-success h-75 w-100 mt-3"
                      onClick={(e) => Submit()}
                    >
                      Xem
                    </button>
                  </div>
                </div>
              </form>
              <div
                className="w-75 mt-4 rounded-4 border border-3 border-danger"
                style={{ margin: "0 auto" }}
              >
                <div className="p-4 text-center text-warning">
                  <h3 className="mb-0">Tổng vé bán: {quantityTicket}</h3>
                  <h3 className="mb-0">
                    {" "}
                    <CurrencyFormat
                      prefix={"Tổng doanh thu: "}
                      value={revenue}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandSpacing={3}
                      suffix={" VND"}
                    />
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
