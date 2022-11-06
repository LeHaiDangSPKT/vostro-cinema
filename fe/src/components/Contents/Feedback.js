import React from "react";
import Axios from "axios";
import ReserveString from "../../utils/ReserveString";
export default function Feedback() {
  const [check, setCheck] = React.useState(true);
  const [listFeedback, setListFeedback] = React.useState([]);
  const [feedback, setFeedback] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [comment, setComment] = React.useState({
    userId: localStorage.getItem("id"),
    name: localStorage.getItem("name"),
    content: "",
    mode: "user",
  });
  React.useEffect(() => {
    setQuantity(feedback.length);
  }, [feedback]);

  React.useEffect(() => {
    Axios.get("http://localhost:5000/user/findAllFeedback").then((response) => {
      setListFeedback(response.data);
    });
  }, [check]);
  const SendFeedback = () => {
    Axios.post("http://localhost:5000/user/feedback", {
      userId: comment.userId,
      name: comment.name,
      content: feedback,
      mode: comment.mode,
    }).then(function (response) {
      setFeedback("");
      setCheck((prev) => (prev = !check));
    });
  };

  return (
    <div className="bg-light w-100">
      <div className="p-4 w-75 " style={{ margin: "0 auto" }}>
        <h3 className="text-center text-success mt-2">ĐÓNG GÓP Ý KIẾN</h3>
        <div>
          <label className="form-label">Viết góp ý của bạn:</label>
          <textarea
            className="form-control"
            value={feedback}
            rows="5"
            onChange={(e) => setFeedback(e.target.value)}
            maxlength="500"
          ></textarea>
        </div>
        <div className="mt-2 text-end">Số kí tự: {quantity} / 500</div>
        <div className="d-flex flex-row-reverse mt-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={(e) => SendFeedback()}
          >
            Gửi góp ý
          </button>
          <select
            className="rounded-2 me-2 fs-6"
            onChange={(e) => setComment({ ...comment, mode: e.target.value })}
          >
            <option value="user">Tài khoản hiện tại</option>
            <option value="anonymous">Ẩn danh</option>
          </select>
        </div>
        <div>
          {listFeedback.map((item) => {
            return (
              <div
                key={item._id}
                className="text-justify darker mt-4 float-right"
              >
                <div className="d-flex align-items-center">
                  <img
                    src="https://i.imgur.com/CFpa3nK.jpg"
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                  ></img>
                  {item.mode == "user" ? (
                    <h5 className="m-0 me-2">{item.name}</h5>
                  ) : (
                    <h5 className="m-0 me-2">Ẩn danh</h5>
                  )}
                  <span>{ReserveString(item.createdAt.slice(0, 10))}</span>
                </div>
                <p>{item.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
