import React from "react";
import Toast from "../Toast";
import ToastUtils from "../../utils/ToastUtils";
import Axios from "axios";
import LoadingPage from "../../utils/LoadingPage";

export default function ResetPassword() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(true);
  const [otp, setOtp] = React.useState(0);
  const [sendOtp, setSendOtp] = React.useState("");
  const [textToast, setTextToast] = React.useState("");

  React.useEffect(() => {
    setOtp(Math.floor(Math.random() * 10000000));
  }, [setSent]);

  const GetOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(process.env.REACT_APP_API + "/user/resetPassword", {
      state: "getOTP",
      email: email,
      otp: otp,
    })
      .then(function (response) {
        setSent(false);
        setLoading(false);
        setTextToast(`Hệ thống đã gửi mã đến ${email}`);
        ToastUtils("success");
      })
      .catch(function (error) {
        setTextToast(error.response.data);
        ToastUtils("fail");
        setLoading(false);
      });
  };

  const SendOTP = (e) => {
    e.preventDefault();
    if (parseInt(sendOtp) === otp) {
      setLoading(true);
      Axios.post(process.env.REACT_APP_API + "/user/resetPassword", {
        state: "sendOTP",
        email: email,
      })
        .then(function (response) {
          setSent(false);
          setLoading(false);
          setTextToast(`Hệ thống đã gửi mật khẩu đến ${email}`);
          ToastUtils("success");
          document.location.href = "/";
        })
        .catch(function (error) {
          setLoading(false);
          setTextToast(error.response.data);
          ToastUtils("fail");
        });
    } else {
      alert("Bạn nhập sai mã OTP");
      window.location.reload();
    }
  };

  return (
    <div className="bg-light w-75 rounded-2" style={{ margin: "0 auto" }}>
      <div className="p-4">
        {loading ? (
          <LoadingPage />
        ) : sent ? (
          <>
            <h3 className="text-center text-success mt-2">Lấy mã OTP</h3>
            <form onSubmit={(e) => GetOTP(e)}>
              <div className="w-75" style={{ margin: "0 auto" }}>
                <div className="mb-3">
                  <label className="form-label">
                    Nhập địa chỉ email tài khoản của bạn:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                  <button
                    className="btn btn-outline-success rounded-circle"
                    style={{
                      margin: "0 auto",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    Lấy mã xác thực
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <form onSubmit={(e) => SendOTP(e)}>
            <div className="w-75" style={{ margin: "0 auto" }}>
              <h3 className="text-center text-success mt-2">
                Nhập mã bạn nhận được
              </h3>
              <div className="mb-3 w-25" style={{ margin: "0 auto" }}>
                <input
                  type="text"
                  className="form-control text-center"
                  required
                  onChange={(e) => setSendOtp(e.target.value)}
                ></input>
              </div>
              <div className="mb-3 d-flex justify-content-center flex-column">
                <button
                  className="btn btn-outline-success rounded-circle"
                  style={{
                    margin: "0 auto",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  Lấy lại mật khẩu
                </button>
                <button
                  className="btn btn-outline-success"
                  style={{ margin: "15px auto", width: "200px" }}
                  onClick={(e) => setSent(true)}
                >
                  Nhập lại email
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <Toast text={textToast} bg="bg-danger" id="fail" />
      <Toast text={textToast} bg="bg-success" id="success" />
    </div>
  );
}
