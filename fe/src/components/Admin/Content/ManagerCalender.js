import React from "react";

export default function ManagerCalender() {
  return (
    <div className="bg-light">
      <div className="p-4 w-75" style={{ margin: "0 auto" }}>
        <h3 className="text-center text-success mt-2">
          Tất cả các suát chiếu trong ngày
        </h3>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <div className="admin-calender bg-secondary text-light rounded-2">
            <input value="00 : 00" className="w-100 text-center fs-4"></input>
            <div className="update-and-delete">
              <button
                className="btn-hover rounded-start"
                data-bs-toggle="modal"
                data-bs-target="#update"
              >
                <i class="fa-solid fa-pencil"></i>
              </button>
              <button
                className="btn-hover rounded-end"
                data-bs-toggle="modal"
                data-bs-target="#delete"
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
        <button
          className="btn btn-success w-100 mt-4"
          data-bs-toggle="modal"
          data-bs-target="#add"
        >
          Thêm suất chiếu mới
        </button>
      </div>
      {/* Modal DELETE */}
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
                Xoá xuất chiếu
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Xuất chiếu này sẽ bị xoá vĩnh viễn và không thể khôi phục
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
                // onClick={(e) => DeleteSuccess(e)}
              >
                Tôi chắn chắn
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal UPDATE */}
      <div
        class="modal fade"
        id="add"
        tabindex="-1"
        aria-labelledby="AddLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="AddLabel">
                Thêm xuất chiếu
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="input-group">
                <input type="number" class="form-control"></input>
                <span class="input-group-text">Giờ</span>
                <input type="number" class="form-control"></input>
                <span class="input-group-text">Phút</span>
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
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                // onClick={(e) => AddSuccess(e)}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal UPDATE */}
      <div
        class="modal fade"
        id="update"
        tabindex="-1"
        aria-labelledby="UpdateLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="UpdateLabel">
                Sửa xuất chiếu
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="input-group">
                <input type="number" class="form-control"></input>
                <span class="input-group-text">Giờ</span>
                <input type="number" class="form-control"></input>
                <span class="input-group-text">Phút</span>
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
              <button
                type="button"
                class="btn btn-warning"
                data-bs-dismiss="modal"
                // onClick={(e) => UpdateSuccess(e)}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
