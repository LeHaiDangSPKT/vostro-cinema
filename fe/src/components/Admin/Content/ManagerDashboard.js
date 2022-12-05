import React from "react";
import Axios from "axios";
import CurrencyFormat from "react-currency-format";
import LoadingPage from "../../../utils/LoadingPage";
import { CanvasJSChart } from "canvasjs-react-charts";
import $ from "jquery";
export default function ManagerDashboard() {
  const [checked, setChecked] = React.useState(true);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [optionsCircle, setOptionsCircle] = React.useState({});
  const [optionsLine, setOptionsLine] = React.useState({});
  const [quantityTicket, setQuantityTicket] = React.useState(0);
  const [year, setYear] = React.useState(0);
  const [theater, setTheater] = React.useState(0);
  const [dataYear, setDataYear] = React.useState([]);
  const [revenue, setRevenue] = React.useState(0);
  const [listOfTheater, setListOfTheater] = React.useState(0);
  React.useEffect(() => {
    Axios.get(process.env.REACT_APP_API + "/admin/getAllTheater").then(
      (responses) => {
        const arrChart = $('[id*="canvasjs-react-chart-container"]');
        var temp = false;
        for (var i = 0; i < arrChart.length; i++) {
          if (!arrChart[i].firstChild) {
            window.location.reload();
            temp = true;
            break;
          }
        }
        setPageLoading(temp);
        setListOfTheater(responses.data);
        Axios.get(process.env.REACT_APP_API + "/admin/getAllBillToChart").then(
          (response) => {
            setOptionsCircle({
              backgroundColor: "#f8f9fa",
              title: {
                text: "TỔNG LƯỢNG VÉ BÁN CỦA CÁC RẠP PHIM",
                fontFamily: "tahoma",
                fontWeight: 700,
                padding: "15",
              },
              data: [
                {
                  type: "pie",
                  startAngle: 240,
                  yValueFormatString: '##0.00"%"',
                  indexLabel: "{label} {y}",
                  dataPoints: Object.entries(response.data[1]).map((item) => {
                    return {
                      y: (item[1] / response.data[0].totalBill) * 100,
                      label: responses.data
                        .map((items) => {
                          if (items._id == item[0]) {
                            return items.name;
                          }
                        })
                        .filter((item) => item != undefined),
                    };
                  }),
                },
              ],
            });
            setOptionsLine({
              backgroundColor: "#f8f9fa",
              animationEnabled: true,
              theme: "light2",
              title: {
                text: "THỐNG KÊ VÉ BÁN THEO THÁNG",
                fontFamily: "tahoma",
                fontWeight: 700,
                padding: "15",
              },
              axisX: {
                crosshair: {
                  enabled: true,
                  snapToDataPoint: true,
                },
              },
              axisY: {
                title: "Số lượng vé",
                includeZero: true,
                crosshair: {
                  enabled: true,
                },
              },
              toolTip: {
                shared: true,
              },
              legend: {
                cursor: "pointer",
                verticalAlign: "bottom",
                horizontalAlign: "left",
                dockInsidePlotArea: true,
              },
              data: [
                {
                  type: "line",
                  showInLegend: true,
                  name: "Năm hiện tại",
                  markerType: "square",
                  color: "#F08080",
                  dataPoints: response.data[2][0].map((item, index) => {
                    return { x: index + 1, y: item };
                  }),
                },
                {
                  type: "line",
                  showInLegend: true,
                  name: "Năm trước",
                  lineDashType: "dash",
                  dataPoints: response.data[2][1].map((item, index) => {
                    return { x: index + 1, y: item };
                  }),
                },
              ],
            });
          }
        );
      }
    );
    Axios.get(process.env.REACT_APP_API + "/admin/getAllYear").then(
      (response) => {
        // setPageLoading(false);
        setDataYear(response.data);
      }
    );
  }, []);

  const checkChart = () => {};

  const Submit = (e) => {
    e.preventDefault();
    // setPageLoading(true);
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
              <form onSubmit={(e) => Submit(e)}>
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
                        return item._id == theater ? (
                          <option value={item._id} key={item._id} selected>
                            {item.name}
                          </option>
                        ) : (
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
                        return item == year ? (
                          <option key={item} value={item} selected>
                            {item}
                          </option>
                        ) : (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="submit"
                      className="btn btn-success h-75 w-100 mt-3"
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
            <div className="w-75 p-4" style={{ margin: "0 auto" }}>
              <CanvasJSChart options={optionsCircle} />
              <CanvasJSChart options={optionsLine} />
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
