import React from "react";

export default function InfoDetails(props) {
  const user = props.oneUser;
  return (
    <div className="bg-secondary rounded-4 bg-opacity-50 ms-2">
      <div className="text-center text-dark p-2">
        <i class="fa-solid fa-user fs-1 p-3 bg-success rounded-5"></i>
        <h4 className="mt-3">{user.name}</h4>
        <div className="text-start">
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Mã khách hàng:
              <span className="fw-normal ms-1">{user._id}</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Tên khách hàng: <span className="fw-normal">{user.name}</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Ngày sinh:{" "}
              <span className="fw-normal">
                {user.dateOfBirthday.substring(0, 10)}
              </span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Số điện thoại:{" "}
              <span className="fw-normal">{user.numberPhone}</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Email: <span className="fw-normal">{user.email}</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Tài khoản: <span className="fw-normal">{user.username}</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Mật khẩu: <span className="fw-normal">{user.password}</span>
            </span>
          </div>
          <div className="my-3">
            <span className="fw-bold mx-1 ">
              Ngày tạo:{" "}
              <span className="fw-normal">
                {user.createdAt.substring(0, 10)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
