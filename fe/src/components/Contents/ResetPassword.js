import React from "react";

export default function ResetPassword() {
  return (
    <div className="bg-light w-75 rounded-2" style={{ margin: "0 auto" }}>
      <div className="p-4">
        <h3 className="text-center text-success mt-2">Lấy lại mật khẩu</h3>
        <div className="w-75" style={{ margin: "0 auto" }}>
          <div className="mb-3">
            <label className="form-label">
              Nhập địa chỉ email tài khoản của bạn:
            </label>
            <input type="email" className="form-control" id="email"></input>
          </div>
          <div className="mb-3 d-flex justify-content-center">
            <button
              className="btn btn-outline-success rounded-circle"
              style={{ margin: "0 auto", width: "100px", height: "100px" }}
              id="getOtp"
            >
              Lấy mã xác thực
            </button>
          </div>
        </div>

        {/* Sau khi nhấn nút */}
        <div className="w-75" style={{ margin: "0 auto" }}>
          <h3 className="text-center text-success mt-2">
            Nhập mã bạn nhận được
          </h3>
          <div className="mb-3 w-25" style={{ margin: "0 auto" }}>
            <input
              type="text"
              className="form-control text-center"
              id="otp"
            ></input>
          </div>
          <div className="mb-3 d-flex justify-content-center">
            <button
              className="btn btn-outline-success rounded-circle"
              style={{ margin: "0 auto", width: "100px", height: "100px" }}
              id="sendOtp"
            >
              Lấy lại mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
