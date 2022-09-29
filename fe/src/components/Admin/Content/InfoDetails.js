import React from "react";

export default function InfoDetails() {
  return (
    <div className="bg-secondary rounded-4 bg-opacity-50 ms-2">
      <div className="text-center text-dark p-2">
        <i class="fa-solid fa-user fs-1 p-3 bg-success rounded-5"></i>
        <h4 className="mt-3">Lê Hải Đăng</h4>
        <div className="text-start">
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Mã khách hàng:
              <span className="fw-normal">djhagsdjgasduygas</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Tên khách hàng: <span className="fw-normal">Lê Hải Đăng</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Ngày sinh: <span className="fw-normal">05/09/2002</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Số điện thoại: <span className="fw-normal">0868366694</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Email: <span className="fw-normal">haidang@gmail.com</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Tài khoản: <span className="fw-normal">haidangggggg</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Mật khẩu: <span className="fw-normal">123456789</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Ngày tạo: <span className="fw-normal">29/09/2022</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
