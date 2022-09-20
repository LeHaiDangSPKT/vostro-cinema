import * as React from "react";
import Logo from "../imgs/logo.png";

export default function Header() {
  const toggleModal = (nameModal) => {
    document.getElementById(`btn-${nameModal}`).click();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-transparent">
        <div className="container-fluid">
          <a className="text-white navbar-brand" href="/">
            <img src={Logo} alt="" width="150" height="80" />
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-3">
                <a className="text-white nav-link" href="">
                  Mua vé
                </a>
              </li>
              <li className="nav-item me-3">
                <a className="text-white nav-link" href="">
                  Lịch chiếu
                </a>
              </li>
              <li className="nav-item me-3">
                <a className="text-white nav-link" href="">
                  Hệ thống rạp
                </a>
              </li>
              <li className="nav-item me-3">
                <a className="text-white nav-link" href="">
                  Tuyển dụng
                </a>
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
            </div>
          </div>
        </div>
      </nav>

      {/* <!-- Modal Đăng Nhập  --> */}
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
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Tên đăng nhập
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  aria-describedby="emailHelp"
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                ></input>
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
                <button type="button" className="btn btn-outline-success">
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Đăng Kí  --> */}
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
              <form>
                <div className="mb-3">
                  <label htmlFor="username-sign-in" className="form-label">
                    Tên đăng nhập
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="username-sign-in"
                    aria-describedby="emailHelp"
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="password-sign-in" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-sign-in"
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password-confirm-passwor"
                    className="form-label"
                  >
                    Nhập lại mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                  ></input>
                </div>
              </form>
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
                <button type="button" className="btn btn-outline-success">
                  Đăng ký tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
