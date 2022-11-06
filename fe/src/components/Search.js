import React from "react";

export default function Search() {
  return (
    <div
      className="w-75 mt-4 d-flex justify-content-center align-items-center"
      style={{ margin: "0 auto" }}
    >
      <div className="d-flex justify-content-center align-items-center w-75">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm tên phim..."
        ></input>
        <select className="p-2 mx-1 rounded-2">
          <option defaultValue>Choose...</option>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
      </div>
      <button
        type="button"
        className="btn btn-success"
        style={{ height: "40px" }}
      >
        Tìm kiếm
      </button>
    </div>
  );
}
