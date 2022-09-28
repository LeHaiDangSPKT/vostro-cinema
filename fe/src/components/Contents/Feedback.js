import React from "react";
import Toast from "../Toast";
import * as bootstrap from "bootstrap";

export default function Feedback() {
  const [feedback, setFeedback] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  React.useEffect(() => {
    setQuantity(feedback.length);
  }, [feedback]);

  const SendFeedback = () => {
    window.bootstrap = bootstrap;
    const toastLiveExample = document.getElementById("feedback");
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
    setFeedback("");
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
          <select className="rounded-2 me-2 fs-6">
            <option value="">Tài khoản hiện tại</option>
            <option value="">Ẩn danh</option>
          </select>
        </div>
        <div>
          <div class="text-justify darker mt-4 float-right">
            <div className="d-flex align-items-center">
              <img
                src="https://i.imgur.com/CFpa3nK.jpg"
                class="rounded-circle me-2"
                width="40"
                height="40"
              ></img>
              <h5 className="m-0 me-2">Rob Simpson</h5>
              <span>29/09/2022</span>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus numquam assumenda hic aliquam vero sequi velit molestias
              doloremque molestiae dicta?
            </p>
          </div>
          <div class="text-justify darker mt-4 float-right">
            <div className="d-flex align-items-center">
              <img
                src="https://i.imgur.com/CFpa3nK.jpg"
                class="rounded-circle me-2"
                width="40"
                height="40"
              ></img>
              <h5 className="m-0 me-2">Rob Simpson</h5>
              <span>29/09/2022</span>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus numquam assumenda hic aliquam vero sequi velit molestias
              doloremque molestiae dicta?
            </p>
          </div>
          <div class="text-justify darker mt-4 float-right">
            <div className="d-flex align-items-center">
              <img
                src="https://i.imgur.com/CFpa3nK.jpg"
                class="rounded-circle me-2"
                width="40"
                height="40"
              ></img>
              <h5 className="m-0 me-2">Rob Simpson</h5>
              <span>29/09/2022</span>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus numquam assumenda hic aliquam vero sequi velit molestias
              doloremque molestiae dicta?
            </p>
          </div>
        </div>
      </div>
      <Toast text="Gửi thành công" bg="bg-success" id="feedback" />
    </div>
  );
}
