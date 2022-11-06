import React from "react";

export default function Footer() {
  return (
    <footer className="text-center text-lg-start bg-light text-muted bottom pt-2 mt-4">
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-center">
              <h6 className="text-uppercase fw-bold mb-4">Vostro Cinema</h6>
              <p>
                VostroCinema là một hệ thống trực tuyến dùng để quản lí các suất
                chiếu rạp và sự kiện hàng tháng của rạp phim cho phép khách hàng
                có thể đặt vé online và cập nhật thông tin các suất chiếu liên
                tục
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-center">
              <h6 className="text-uppercase fw-bold mb-4">Technology</h6>
              <p>
                <a href="https://www.mongodb.com/" className="text-reset">
                  MongoDB
                </a>
              </p>
              <p>
                <a href="https://expressjs.com/" className="text-reset">
                  ExpressJS
                </a>
              </p>
              <p>
                <a href="https://reactjs.org/" className="text-reset">
                  ReactJS
                </a>
              </p>
              <p>
                <a href="https://nodejs.org/en/" className="text-reset">
                  NodeJS
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-center">
              <h6 className="text-uppercase fw-bold mb-4">Others</h6>
              <p>
                <a href="https://getbootstrap.com/" className="text-reset">
                  Bootstrap
                </a>
              </p>
              <p>
                <a href="https://fontawesome.com/" className="text-reset">
                  Font Awesome
                </a>
              </p>
              <p>
                <a href="https://nodemailer.com/about/" className="text-reset">
                  NodeMailer
                </a>
              </p>
              <p>
                <a
                  href="https://axios-http.com/docs/intro"
                  className="text-reset"
                >
                  Axios
                </a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-center">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fa-solid fa-user"></i> Lê Hải Đăng (Leader)
              </p>
              <p>
                <i className="fa-regular fa-user"></i> Lê Đình Trường
              </p>
              <p>
                <i className="fa-regular fa-user"></i> Lương Xuân Thắng
              </p>
              <p>
                <i className="fa-regular fa-user"></i> Trần Huỳnh Tấn Phát
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        {`© ${new Date().getFullYear()} Copyright: `}
        Team 5
      </div>
    </footer>
  );
}
