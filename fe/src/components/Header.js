import * as React from "react";
import Logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import Toast from "./Toast";
import * as bootstrap from "bootstrap";

export default function Header() {
  const singIn = () => {
    window.bootstrap = bootstrap;
    const toastLiveExample = document.getElementById("signIn");
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  };
  const toggleModal = (nameModal) => {
    document.getElementById(`btn-${nameModal}`).click();
  };

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
                <Link className="text-white nav-link" to="/buy-ticket">
                  Đặt vé
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/calender">
                  Lịch chiếu
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/system">
                  Hệ thống rạp
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/recruit">
                  Tuyển dụng
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="text-white nav-link" to="/feedback">
                  Góp ý
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <button
                className="btn btn-outline-success me-3"
                data-bs-toggle="modal"
                data-bs-target="#signIn"
                id="btn-sign-in"
              >
                Đăng kí
              </button>
              <button
                type="button"
                className="btn btn-outline-success me-3"
                data-bs-toggle="modal"
                data-bs-target="#login"
                id="btn-login"
              >
                Đăng nhập
              </button>
              <div className="dropdown-center">
                <button
                  className="d-flex align-items-center text-light bg-transparent justify-content-center "
                  style={{ minWidth: "220px" }}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="me-2">Lê Hải Đăng</span>
                  <div
                    className="bg-success rounded-5"
                    style={{ margin: "auto 0" }}
                  >
                    <i className="fa-solid fa-user fs-4 p-3"></i>
                  </div>
                </button>
                <ul className="dropdown-menu w-100">
                  <li>
                    <a className="dropdown-item" href="/me/manager-info">
                      Quản lý thông tin cá nhân
                    </a>
                  </li>

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

      {/* <!-- Modal Đăng Nhập  --> */}
      <form>
        <div
          className="modal fade"
          id="login"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="loginLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loginLabel">
                  Đăng nhập
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 text-center">
                  <img src={Logo} alt="" width="150" height="80" />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username-login"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-login"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <a
                    href="/password/reset-password"
                    className="text-decoration-none"
                  >{`<<Quên mật khẩu`}</a>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    data-bs-dismiss="modal"
                    onClick={() => toggleModal("sign-in")}
                  >
                    {`<< Đăng ký`}
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    data-bs-dismiss="modal"
                  >
                    Huỷ
                  </button>
                  <button type="submit" className="btn btn-outline-success">
                    Đăng nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- Modal Đăng Kí  --> */}
      <form>
        <div
          className="modal fade"
          id="signIn"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="signInLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="signInLabel">
                  Đăng kí
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 text-center">
                  <img src={Logo} alt="" width="150" height="80" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Họ và tên:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Ngày tháng năm sinh:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Số điện thoại:</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    required
                    minLength="10"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tên tài khoản:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username-signin"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mật khẩu:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-signin"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Nhập lại mật khẩu:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    required
                  ></input>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    data-bs-dismiss="modal"
                    onClick={() => toggleModal("login")}
                  >
                    {`<< Đăng nhập`}
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2 "
                    data-bs-dismiss="modal"
                  >
                    Huỷ
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    onClick={(e) => singIn()}
                  >
                    Đăng ký tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Toast text="Bạn đã đăng ký thành công" bg="bg-success" id="signIn" />
    </header>
  );
}
