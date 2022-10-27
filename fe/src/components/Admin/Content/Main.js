import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
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
      text: "Thêm, sửa, xoá phim",
      link: "/admin/manager-films",
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
      link: "/admin/manager-service",
    },
    {
      text: "Chỉnh sửa giá bắp, nước",
      link: "/admin/manager-service",
    },
  ];

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
}
