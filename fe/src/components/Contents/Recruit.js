import React from "react";
import Recruit_img from "../../imgs/recruit-main.png";
import Toast from "../Toast";
import ToastUtils from "../../utils/ToastUtils";
import Axios from "axios";
import LoadingPage from "../../utils/LoadingPage";

export default function Recruit() {
  const [pageLoading, setPageLoading] = React.useState(true);
  const [textToast, setTextToast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [file, setFile] = React.useState("");
  const [listTheaters, setListTheaters] = React.useState([]);

  React.useEffect(() => {
    Axios.get(
      "https://vostro-cinema.herokuapp.com/admin/getNameAndIdAllTheater"
    ).then((response) => {
      setListTheaters(response.data);
      setPageLoading(false);
    });
  }, []);

  const SendCV = (e) => {
    if (file.split(".").pop() !== "pdf") {
      setTextToast("File phải có định dạng là PDF");
      ToastUtils("fail");
    } else {
      setPageLoading(true);
      Axios.post("https://vostro-cinema.herokuapp.com/user/sendLetter", {
        email: email,
      }).then((response) => {
        setPageLoading(false);
        setTimeout(() => {
          setTextToast(`Gửi thành công. Kiểm tra email ${email} bạn nhé`);
          ToastUtils("success");
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        }, 500);
      });
    }
  };
  return (
    <>
      {pageLoading ? (
        <LoadingPage />
      ) : (
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
                  phim lớn nhất toàn cầu và là nhà phát hành, cụm rạp chiếu phim
                  lớn nhất tại Việt Nam. VOSTRO CINEMA luôn mong muốn mang đến
                  nhiều cơ hội làm việc cho các tài năng trẻ, năng động, yêu
                  thích ngành công nghiệp điện ảnh.
                </p>
                Tiêu chí của hệ thống:
                <ul>
                  <li>Nhân viên trung thực</li>
                  <li>Tính cách hoà đồng</li>
                  <li>Không làm việc riêng trong giờ làm việc</li>
                  <li>Nói không với chất cấm</li>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Ứng tuyển tại rạp:</label>
                  <select className="form-control" id="recruit-place" required>
                    <option value="">Choose...</option>
                    {listTheaters &&
                      listTheaters.map((item) => {
                        return <option value={item._id}>{item.name}</option>;
                      })}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Chức vụ ứng tuyển:</label>
                  <select className="form-control" id="recruit-role" required>
                    <option value="">Choose...</option>
                    <option value="">Quản lý kỹ thuật</option>
                    <option value="">Quản lý nhân sự</option>
                    <option value="">Quản lý an ninh</option>
                    <option value="">Marketing</option>
                    <option value="">Nhân viên chăm sóc khách hàng</option>
                    <option value="">Nhân viên bán hàng</option>
                    <option value="">Bảo vệ</option>
                    <option value="">Lao công</option>
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
                    value={file}
                    onChange={(e) => setFile(e.target.value)}
                  ></input>
                </div>
                <button
                  type="button"
                  className="btn btn-success w-75 d-flex justify-content-center"
                  style={{ margin: "0 auto" }}
                  onClick={(e) => SendCV(e)}
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
                    Vostro Cinema tuyển dụng không tốn bất kỳ chi phí nào. TUYỆT
                    ĐỐI không nộp phí với bất kỳ hình thức nào
                  </li>
                  <li>
                    Vostro Cinema sẽ liên lạc với ứng viên phù hợp qua điện
                    thoại/email.
                  </li>
                  <li>
                    Hiện tại Vostro Cinema không tuyển nhân viên thông qua đơn
                    vị khác, ứng viên lưu ý để tránh các trường hợp lừa đảo
                    tuyển dụng.
                  </li>
                  <li>
                    Tất cả các thông tin tuyển dụng sẽ được đăng trên website
                    ......., các trang tuyển dụng uy tín và các kênh mạng xã hội
                    của Vostro Cinema.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Toast text={textToast} bg="bg-danger" id="fail" />
          <Toast text={textToast} bg="bg-success" id="success" />
        </div>
      )}
    </>
  );
}
