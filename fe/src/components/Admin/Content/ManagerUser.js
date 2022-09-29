import React from "react";
import InfoDetails from "./InfoDetails";
import * as bootstrap from "bootstrap";
import $ from "jquery";
import Toast from "../../Toast";

export default function ManagerUser() {
  const DeleteSuccess = (e) => {
    window.bootstrap = bootstrap;
    const toastLiveExample = $("#admin-delete");
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  };
  return (
    <div>
      <div className="bg-light rounded-2" style={{ margin: "0 auto" }}>
        <div className="p-4">
          <h3 className="text-center text-success mt-2">
            TẤT CẢ CÁC KHÁCH HÀNG
          </h3>
          <div className="d-flex mt-4">
            <div className="w-75">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="table__header" scope="col">
                      #
                    </th>
                    <th className="table__header" scope="col">
                      Mã khách hàng
                    </th>
                    <th className="table__header" scope="col">
                      Tên khách hàng
                    </th>
                    <th className="table__header" scope="col">
                      Số điện thoại
                    </th>
                    <th className="table__header" scope="col">
                      Email
                    </th>
                    <th className="table__header" scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table__row">
                    <th>1</th>
                    <td>Hai dang</td>
                    <td>hai dang</td>
                    <td>hai dang</td>
                    <td>hai dang</td>
                    <td>
                      <button
                        className="btn border-white"
                        data-bs-toggle="modal"
                        data-bs-target="#delete"
                      >
                        <i class="fa-solid fa-trash-can text-danger"></i>
                      </button>
                    </td>
                  </tr>
                  <tr className="table__row">
                    <th>1</th>
                    <td>Hai dang</td>
                    <td>hai dang</td>
                    <td>hai dang</td>
                    <td>hai dang</td>
                    <td>
                      <button
                        className="btn border-white"
                        data-bs-toggle="modal"
                        data-bs-target="#delete"
                      >
                        <i class="fa-solid fa-trash-can text-danger"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-25">
              <InfoDetails />
            </div>
          </div>
        </div>
      </div>
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
                Xoá tài khoản
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Tài khoản này sẽ bị khoá vĩnh viễn và không thể khôi phục
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
                onClick={(e) => DeleteSuccess(e)}
              >
                Tôi chắn chắn
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toast text="Xoá thành công" bg="bg-success" id="admin-delete" />
    </div>
  );
}
