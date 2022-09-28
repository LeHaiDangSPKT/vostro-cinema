import React from "react";
import Recruit_img from "../../imgs/recruit-main.png";
import Toast from "../Toast";
import * as bootstrap from "bootstrap";
export default function Recruit() {
  const SendCV = (e) => {
    if (e.target.value.split(".").pop() !== "pdf") {
      window.bootstrap = bootstrap;
      const toastLiveExample = document.getElementById("checkFile");
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    }
  };
  return (
    <div className="bg-light w-75 rounded-2" style={{ margin: "0 auto" }}>
      <div className="p-4">
        <h3 className="text-center text-success mt-2">
          ĐỒNG HÀNH CÙNG VOSTRO CINEMA VIETNAM
        </h3>
        <div className="d-flex justify-content-between">
          <img src={Recruit_img} className="rounded-start" alt="" />
          <div className="d-flex flex-column justify-content-center ps-3 pe-2 border border-success rounded-end border-3 border-start-0">
            <p style={{ textAlign: "justify" }}>
              VOSTRO CINEMA trực thuộc VOSTRO Group một trong những tập đoàn
              kinh tế đa ngành lớn nhất của Hàn Quốc đã có mặt ở 21 quốc gia
              trên thế giới. VOSTRO CINEMA là một trong top 05 cụm rạp chiếu
              phim lớn nhất toàn cầu và là nhà phát hành, cụm rạp chiếu phim lớn
              nhất tại Việt Nam. VOSTRO CINEMA luôn mong muốn mang đến nhiều cơ
              hội làm việc cho các tài năng trẻ, năng động, yêu thích ngành công
              nghiệp điện ảnh.
            </p>
            Hiện tại có cá tiêu chí....
            <ul>
              <li>a</li>
              <li>a</li>
              <li>a</li>
              <li>a</li>
            </ul>
          </div>
        </div>
        <h3 className="text-center text-success mt-4">
          NỘP ĐƠN ỨNG TUYỂN NGAY BẠN ƠI !!!
        </h3>
        <form>
          <div className="w-75" style={{ margin: "0 auto" }}>
            <div className="mb-3">
              <label className="form-label">Họ và tên:</label>
              <input
                type="text"
                className="form-control"
                id="recruit-fullname"
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại:</label>
              <input
                type="tel"
                className="form-control"
                id="recruit-phone"
                required
                minLength="10"
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="recruit-email"
                required
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Ứng tuyển tại rạp:</label>
              <select className="form-control" id="recruit-place" required>
                <option value="">Choose...</option>
                <option value="">Nơi 1</option>
                <option value="">Nơi 2</option>
                <option value="">Nơi 3</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Chức vụ ứng tuyển:</label>
              <select className="form-control" id="recruit-role" required>
                <option value="">Choose...</option>
                <option value="">Vị trí 1</option>
                <option value="">Vị trí 2</option>
                <option value="">Vị trí 3</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Gừi CV của bạn (chỉ chấp nhận file .pdf):
              </label>
              <input
                type="file"
                className="form-control"
                id="recruit-cv"
                required
                onChange={(e) => SendCV(e)}
              ></input>
            </div>
            <button
              type="submit"
              className="btn btn-success w-75 d-flex justify-content-center"
              style={{ margin: "0 auto" }}
              onClick={(e) => SendCV()}
            >
              Nộp hồ sơ
            </button>
          </div>
        </form>
        <div
          className="w-75 mt-4 rounded-4 border border-3 border-danger"
          style={{ margin: "0 auto" }}
        >
          <div className="p-4">
            <span className="fs-5 fw-bold text-danger">Lưu ý: </span>
            <ul>
              <li>
                Vostro Cinema tuyển dụng không tốn bất kỳ chi phí nào. TUYỆT ĐỐI
                không nộp phí với bất kỳ hình thức nào
              </li>
              <li>
                Vostro Cinema sẽ liên lạc với ứng viên phù hợp qua điện
                thoại/email.
              </li>
              <li>
                Hiện tại Vostro Cinema không tuyển nhân viên thông qua đơn vị
                khác, ứng viên lưu ý để tránh các trường hợp lừa đảo tuyển dụng.
              </li>
              <li>
                Tất cả các thông tin tuyển dụng sẽ được đăng trên website
                ......., các trang tuyển dụng uy tín và các kênh mạng xã hội của
                Vostro Cinema.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Toast text="File CV phải là file PDF" bg="bg-danger" id="checkFile" />
    </div>
  );
}
