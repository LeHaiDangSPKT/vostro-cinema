import * as React from "react";
import Logo from "../../imgs/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-transparent">
        <div className="container-fluid">
          <Link className="text-white navbar-brand" to="/">
            <img src={Logo} alt="" width="150" height="80" />
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/manager-user">
                  Quản lý khách hàng
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/manager-calender">
                  Quản lý suất chiếu
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/manager-films">
                  Quản lý phim
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/manager-ticket">
                  Quản lý giá vé
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link
                  className="text-white nav-link"
                  to="/manager-food-and-drink"
                >
                  Quản lý thực đơn
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/manager-dashboard">
                  Thống kê doanh thu
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <div className="dropdown-center">
                <button
                  className="d-flex align-items-center text-light bg-transparent justify-content-center "
                  style={{ minWidth: "220px" }}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="me-2">Admin</span>
                  <div
                    className="bg-success rounded-5"
                    style={{ margin: "auto 0" }}
                  >
                    <i className="fa-solid fa-user fs-4 p-3"></i>
                  </div>
                </button>
                <ul className="dropdown-menu w-100">
                  <li>
                    <button className="dropdown-item text-danger">
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
