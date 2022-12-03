import * as React from "react";
import Logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import Toast from "./Toast";
import ToastUtils from "../utils/ToastUtils";
import LoadingPage from "../utils/LoadingPage";
import FacebookLogin from "react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";

export default function Header() {
  const [textToast, setTextToast] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [hasOTP, setHasOTP] = React.useState(true);
  const [OTP, setOTP] = React.useState(0);
  const [sendOTP, setSendOTP] = React.useState("");
  const [newAccount, setNewAccount] = React.useState({
    name: "",
    phoneNumber: "",
    email: "",
    dateOfBirthday: "",
    username: "",
    password: "",
    confirmPassword: "",
    billId: [],
  });

  React.useEffect(() => {
    setOTP(Math.floor(Math.random() * 10000000));
  }, [setHasOTP]);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await Axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );
        Axios.post(
          process.env.REACT_APP_API + "/user/logInOrSingInWithGoogle",
          {
            email: res.data.email,
          }
        )
          .then(function (response) {
            localStorage.setItem("id", response.data._id);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("googleAccount", true);
            document.location.href = "/";
          })
          .catch(function (error) {
            Axios.post(process.env.REACT_APP_API + "/user/signIn", {
              name: res.data.name,
              email: res.data.email,
            })
              .then(function (response) {
                setTextToast("Đăng ký thành công");
                ToastUtils("signIn-success");
                Axios.post(
                  process.env.REACT_APP_API + "/user/logInOrSingInWithGoogle",
                  {
                    email: res.data.email,
                  }
                )
                  .then(function (response) {
                    localStorage.setItem("id", response.data._id);
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("googleAccount", true);
                    document.location.href = "/";
                  })
                  .catch(function (error) {
                    setLoading(false);
                    setTextToast(error.response.data);
                    ToastUtils("signIn-fail");
                  });
              })
              .catch(function (error) {
                setLoading(false);
                setTextToast(error.response.data);
                ToastUtils("signIn-fail");
              });
          });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const loginWithFaceBook = (res) => {
    try {
      Axios.post(process.env.REACT_APP_API + "/user/logInOrSingInWithGoogle", {
        email: res.email,
      })
        .then(function (response) {
          localStorage.setItem("id", response.data._id);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("facebookAccount", true);
          document.location.href = "/";
        })
        .catch(function (error) {
          Axios.post(process.env.REACT_APP_API + "/user/signIn", {
            name: res.name,
            email: res.email,
          })
            .then(function (response) {
              setTextToast("Đăng ký thành công");
              ToastUtils("signIn-success");
              Axios.post(
                process.env.REACT_APP_API + "/user/logInOrSingInWithGoogle",
                {
                  email: res.email,
                }
              )
                .then(function (response) {
                  localStorage.setItem("id", response.data._id);
                  localStorage.setItem("name", response.data.name);
                  localStorage.setItem("facebookAccount", true);
                  document.location.href = "/";
                })
                .catch(function (error) {
                  setLoading(false);
                  setTextToast(error.response.data);
                  ToastUtils("signIn-fail");
                });
            })
            .catch(function (error) {
              setLoading(false);
              setTextToast(error.response.data);
              ToastUtils("signIn-fail");
            });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };
  //Nếu có tg làm thêm chức năng gửi OTP xác nhận SĐT có tồn tại
  const signIn = (e) => {
    e.preventDefault();
    if (!hasOTP) {
      if (OTP === parseInt(sendOTP)) {
        Axios.post(process.env.REACT_APP_API + "/user/signIn", {
          name: newAccount.name,
          phoneNumber: newAccount.phoneNumber,
          email: newAccount.email,
          dateOfBirthday: newAccount.dateOfBirthday,
          username: newAccount.username,
          password: newAccount.password,
        })
          .then(function (response) {
            setTextToast("Đăng ký thành công");
            ToastUtils("signIn-success");
            setTimeout(() => {
              window.location.reload();
            }, 500);
          })
          .catch(function (error) {
            setLoading(false);
            setTextToast(error.response.data);
            ToastUtils("signIn-fail");
          });
      } else {
        alert("Bạn nhập sai mã OTP");
      }
    } else {
      if (newAccount.password == newAccount.confirmPassword) {
        setLoading(true);
        Axios.post(process.env.REACT_APP_API + "/user/signIn", {
          state: "getOTP",
          otp: OTP,
          email: newAccount.email,
          phoneNumber: newAccount.phoneNumber,
          username: newAccount.username,
        })
          .then(function (response) {
            setHasOTP(false);
            setLoading(false);
            setTextToast(
              `Mã xác thực đã được gửi qua email: ${newAccount.email}`
            );
            ToastUtils("signIn-success");
          })
          .catch(function (error) {
            setLoading(false);

            setTextToast(error.response.data);
            ToastUtils("signIn-fail");
          });
      } else {
        setTextToast("Mật khẩu nhập lại không khớp");
        ToastUtils("signIn-fail");
      }
    }
  };

  const logIn = (e) => {
    e.preventDefault();
    Axios.post(process.env.REACT_APP_API + "/user/logIn", {
      username: newAccount.username,
      password: newAccount.password,
    })
      .then(function (response) {
        if (response.data.username == "admin@admin123") {
          localStorage.setItem("login", "admin");
          document.location.href = "/admin";
        } else {
          localStorage.setItem("id", response.data._id);
          localStorage.setItem("name", response.data.name);
          document.location.href = "/";
        }
      })
      .catch(function (error) {
        setTextToast(error.response.data);
        ToastUtils("signIn-fail");
      });
  };
  const toggleModal = (nameModal) => {
    document.getElementById(`btn-${nameModal}`).click();
  };

  const HandeleToggleShowMobile = () => {
    // console.log(document.querySelectorAll(".navbar-collapse")[0].className);
    // console.log(
    //   document
    //     .querySelectorAll(".navbar-collapse")[0]
    //     .className.includes("show")
    // );
  };

  const clickFacebookBtn = () => {
    console.log(document.querySelector(".kep-login-facebook"));
    document.querySelector(".kep-login-facebook").click();
  };
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-transparent">
          <div className="container-fluid">
            <Link className="text-white navbar-brand" to="/">
              <img src={Logo} alt="" width="150" height="80" />
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={HandeleToggleShowMobile}
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                <li className="nav-item me-3">
                  <Link className="text-white nav-link" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="text-white nav-link" to="/recruit">
                    Tuyển dụng
                  </Link>
                </li>
                {localStorage.getItem("id") && (
                  <li className="nav-item me-3">
                    <Link className="text-white nav-link" to="/feedback">
                      Góp ý
                    </Link>
                  </li>
                )}
              </ul>
              <div className="d-flex justify-content-center">
                {!localStorage.getItem("id") ? (
                  <>
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
                  </>
                ) : (
                  <div className="dropdown-center">
                    <button
                      className="d-flex align-items-center text-light border-0 bg-transparent justify-content-center "
                      style={{ minWidth: "220px" }}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="me-2">
                        {localStorage.getItem("name")}
                      </span>
                      <div
                        className="bg-success rounded-5"
                        style={{ margin: "auto 0" }}
                      >
                        <i className="fa-solid fa-user fs-4 p-3"></i>
                      </div>
                    </button>
                    <ul className="dropdown-menu w-100">
                      {localStorage.getItem("googleAccount") ? (
                        <>
                          <li>
                            <a className="dropdown-item" href="/me/history">
                              Xem lịch sử giao dịch
                            </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <a
                              className="dropdown-item"
                              href="/me/manager-info"
                            >
                              Quản lý thông tin cá nhân
                            </a>
                          </li>
                        </>
                      )}

                      <li>
                        <button
                          className="dropdown-item "
                          onClick={(e) => {
                            localStorage.removeItem("id");
                            localStorage.removeItem("name");
                            localStorage.getItem("googleAccount") &&
                              localStorage.removeItem("googleAccount");
                          }}
                        >
                          <a className="dropdown-item text-danger p-0" href="/">
                            Đăng xuất
                          </a>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* <!-- Modal Đăng Nhập  --> */}
        <form onSubmit={(e) => logIn(e)}>
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
                      name="username"
                      onChange={(e) => handleChange(e)}
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
                      name="password"
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
                  <div className="mb-3">
                    <a
                      href="/password/reset-password"
                      className="text-decoration-none"
                    >{`<<Quên mật khẩu`}</a>
                  </div>
                </div>

                <button
                  onClick={loginWithGoogle}
                  class="btn btn-danger btn-rounded w-50 mx-auto mb-3"
                >
                  {" "}
                  <i class="fa-brands fa-google me-2"></i>
                  Continue with Google
                </button>
                <button
                  onClick={clickFacebookBtn}
                  class="btn btn-primary btn-rounded w-50 mx-auto mb-3"
                >
                  {" "}
                  <i class="fa-brands fa-facebook me-2"></i>
                  Continue with Facebook
                </button>
                <button
                  onClick={clickFacebookBtn}
                  class="btn btn-dark btn-rounded w-50 mx-auto mb-3"
                >
                  {" "}
                  <i class="fa-brands fa-github me-2"></i>
                  Continue with Github
                </button>
                <div hidden>
                  <FacebookLogin
                    appId="880047373163698"
                    autoLoad={true}
                    fields="name,email"
                    callback={loginWithFaceBook}
                    icon="fa-facebook"
                  />
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-success"
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
        <form onSubmit={(e) => signIn(e)}>
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
                {loading ? (
                  <LoadingPage />
                ) : (
                  <>
                    <div className="modal-body">
                      {hasOTP ? (
                        <>
                          <div className="mb-3 text-center">
                            <img src={Logo} alt="" width="150" height="80" />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Họ và tên:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fullname"
                              name="name"
                              required
                              onChange={(e) => handleChange(e)}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Ngày tháng năm sinh:
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="dob"
                              name="dateOfBirthday"
                              required
                              onChange={(e) => handleChange(e)}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              id="email"
                              required
                              onChange={(e) => handleChange(e)}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Số điện thoại:</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              name="phoneNumber"
                              required
                              onChange={(e) => handleChange(e)}
                              minLength="10"
                            ></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Tên tài khoản:</label>
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              id="username-signin"
                              required
                              onChange={(e) => handleChange(e)}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Mật khẩu:</label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              id="password-signin"
                              required
                              onChange={(e) => handleChange(e)}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Nhập lại mật khẩu:
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirm-password"
                              name="confirmPassword"
                              onChange={(e) => handleChange(e)}
                              required
                            ></input>
                          </div>
                        </>
                      ) : (
                        <div className="mb-3">
                          <label className="form-label">
                            Nhập mã được gửi đến email:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setSendOTP(e.target.value)}
                            required
                          ></input>
                        </div>
                      )}
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                      {hasOTP ? (
                        <>
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
                            >
                              Đăng ký tài khoản
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={() => {
                                setHasOTP(true);
                              }}
                            >
                              {`<< Trở về`}
                            </button>
                          </div>
                          <div>
                            <button
                              type="submit"
                              className="btn btn-outline-success"
                            >
                              Xác nhận
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
        <Toast text={textToast} bg="bg-success" id="signIn-success" />
        <Toast text={textToast} bg="bg-danger" id="signIn-fail" />
      </header>
    </>
  );
}
