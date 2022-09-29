import React from "react";
import Poster from "../../../imgs/test-2.jpg";
import $ from "jquery";
import Toast from "../../Toast";
import * as bootstrap from "bootstrap";
export default function FilmDetails() {
  const UpdateSuccess = () => {
    window.bootstrap = bootstrap;
    const toastLiveExample = $("#update");
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  };
  const EditInfo = (className, e) => {
    e.preventDefault();
    var input = $("input[id*='manager']");
    if (className === "edit-info") {
      $(".edit-info")[0].setAttribute("disabled", "");
      $(".update-info")[0].classList.remove("d-none");
      for (var i = 0; i < input.length; i++) {
        input[i].removeAttribute("disabled");
      }
      input[0].removeAttribute("disabled");
    } else {
      $(".edit-info")[0].removeAttribute("disabled");
      $(".update-info")[0].classList.add("d-none");
      for (var i = 0; i < input.length; i++) {
        input[i].setAttribute("disabled", "");
      }
      UpdateSuccess();
    }
  };
  return (
    <div className="d-flex">
      <img
        src={Poster}
        style={{ width: "200px", height: "300px", marginRight: "10px" }}
        alt=""
      />
      <div>
        <form className="row g-3" style={{ margin: "0 auto" }}>
          <div className="col-md-6">
            <label className="form-label">Tên phim:</label>
            <input
              type="text"
              className=" form-control"
              id="manager-name-film"
              required
              disabled
              value="Lê Hải Đăng"
              // onChange={(e) => setValue(e.target.value)}
            ></input>
          </div>
          <div className="col-md-6">
            <label className="form-label">Thể loại:</label>
            <input
              type="text"
              className=" form-control"
              id="manager-type"
              required
              disabled
              // onChange={(e) => console.log(e.target.value)}
              value="Kinh dị"
            ></input>
          </div>
          <div className="col-6">
            <label className="form-label">Thời lượng:</label>
            <input
              type="email"
              className="form-control"
              id="manager-lenght"
              value="60 phút"
              required
              disabled
            ></input>
          </div>
          <div className="col-6">
            <label className="form-label">Link trailer:</label>
            <input
              type="text"
              className=" form-control"
              id="manager-link"
              required
              disabled
              value="youtube.com"
            ></input>
          </div>
          <div className="col-md-12">
            <label className="form-label">Mô tả:</label>
            <input
              type="text"
              className="form-control "
              id="manager-describe"
              value="Chúng ta là một gia đình"
              required
              disabled
            ></input>
          </div>
          <div
            className="w-75 mt-3 d-flex justify-content-center"
            style={{ margin: "0 auto" }}
          >
            <button
              type="button"
              className="btn mx-1 w-75 btn-primary edit-info"
              onClick={(e) => EditInfo("edit-info", e)}
            >
              Sửa thông tin
            </button>
            <button
              type="submit"
              className="btn mx-1 w-75 btn-success update-info d-none"
              onClick={(e) => {
                EditInfo("update-info", e);
              }}
            >
              Cập nhật
            </button>
            <button
              type="button"
              className="btn mx-1 w-75 btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#delete"
            >
              Xoá phim
            </button>
          </div>
        </form>
        <div className="row w-75 pb-4" style={{ margin: "0 auto" }}>
          <div className="mt-3 d-flex justify-content-center">
            <button
              type="button"
              className="btn mx-1 w-100 btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#add"
            >
              Thêm phim mới
            </button>
            <button type="button" className="btn mx-1 w-100 btn-warning">
              Đặt vé trước
            </button>
          </div>
        </div>
      </div>
      <Toast text="Cập nhật thành công" bg="bg-success" id="update" />

      {/* Modal Delte */}
      <div
        class="modal fade"
        id="delete"
        tabindex="-1"
        aria-labelledby="deleteLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteLabel">
                Xoá phim
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Phim sẽ bị khoá vĩnh viễn và không thể khôi phục
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Huỷ
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Tôi chắn chắn
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Add */}
      <div
        class="modal fade"
        id="add"
        tabindex="-1"
        aria-labelledby="addLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addLabel">
                Thêm phim mới
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div class="modal-body">
                <div className="mb-3">
                  <label className="form-label">Tên phim:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameOfFiml"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Thể loại:</label>
                  <select className="form-control" id="type" required>
                    <option value="">Choose</option>
                    <option value="">Thể loại 1</option>
                    <option value="">Thể loại 2</option>
                    <option value="">Thể loại 3</option>
                    <option value="">Thể loại 4</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Thời lượng:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lenght"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Link Trailer:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="link"
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mô tả:</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="link"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Huỷ
                </button>
                <button type="submit" class="btn btn-warning">
                  Thêm phim
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
