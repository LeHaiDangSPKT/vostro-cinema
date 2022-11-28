import React from "react";
import { Link } from "react-router-dom";
// import LoadingPage from "../../../utils/LoadingPage";

export default function Main() {
  // const [pageLoading, setPageLoading] = React.useState(true)
  const data = [
    {
      text: "Thêm, sửa, xoá rạp phim",
      link: "/admin/manager-theater-room",
    },
    {
      text: "Xem danh sách phim",
      link: "/admin/manager-films",
    },
    {
      text: "Thêm, sửa, xoá phim",
      link: "/admin/manager-films",
    },
    {
      text: "Thêm, sửa, xoá suất chiếu",
      link: "/admin/manager-calender",
    },
    {
      text: "Xem và xoá tài khoản khách hàng",
      link: "/admin/manager-user",
    },
    {
      text: "Xem thống kê doanh thu",
      link: "/admin/manager-dashboard",
    },
    {
      text: "Chỉnh sửa giá vé",
      link: "/admin/manager-price-of-ticKet",
    },
    {
      text: "Chỉnh sửa giá bắp, nước",
      link: "/admin/manager-price-of-ticKet",
    },
  ];
  try {
    return (
      <div className="bg-light">
        <div className="w-75 p-4" style={{ margin: "0 auto" }}>
          <h3 className="text-center text-success mt-2">
            CÁC CHỨNG NĂNG CHÍNH CỦA ADMIN
          </h3>
          <div className="d-flex flex-wrap justify-content-center">
            {data.map((item) => {
              return (
                <Link to={`${item.link}`} style={{ margin: "7px 10px" }}>
                  <button
                    className="btn btn-success"
                    style={{ width: "200px", height: "100px" }}
                  >
                    {item.text}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
