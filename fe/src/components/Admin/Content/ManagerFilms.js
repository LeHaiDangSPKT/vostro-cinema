import React from "react";
import FilmDetails from "./FilmDetails";
import Axios from "axios";
import Toast from "../../Toast";
import ToastUtils from "../../../utils/ToastUtils";

export default function ManagerFilms() {
  const ref = React.useRef(null);
  const [textToast, setTextToast] = React.useState("");

  const [listNameTheater, setListNameTheater] = React.useState([]);
  const [id, setId] = React.useState("");
  const [listFilm, setListFilm] = React.useState([]);
  const [check, setCheck] = React.useState("");
  const [idFilm, setIdFilm] = React.useState("");
  const [oneFilm, setOneFilm] = React.useState({});

  React.useEffect(() => {
    Axios.get("http://localhost:5000/admin/getNameAndIdAllTheater").then(
      (response) => {
        setListNameTheater(response.data);
        setId(response.data[0]._id);
      }
    );
  }, []);

  React.useEffect(() => {
    id &&
      Axios.get(`http://localhost:5000/admin/getAllFilmsById/${id}`).then(
        (response) => {
          setListFilm(response.data);
          setOneFilm(response.data[0]);
        }
      );
  }, [id, check]);
  // Passing from child
  const handleSetCheck = (e) => {
    setCheck(e);
  };
  const handleSetTextToast = (e) => {
    setTextToast(e.toString());
  };
  const handleSetIdFilm = (e) => {
    // setIdFilm(e.target.value);
    console.log(e.target.value);
  };

  const Delete = () => {
    Axios.delete(`http://localhost:5000/admin/deleteFilmById/${idFilm}`)
      .then(function (response) {
        setCheck(Math.random());
        setTextToast("Đã xoá thành công");
        ToastUtils("success");
      })
      .catch(function (error) {});
  };
  const handleEdit = (id) => {
    return (
      setOneFilm(listFilm.filter((items) => items._id === id)),
      ref.current?.scrollIntoView({ behavior: "smooth" })
    );
  };
  return (
    <div className="bg-light p-4">
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-success mt-2">CÁC PHIM CÓ SẴN</h3>
          Lựa chọn rạp:
          <select
            className="mx-3 rounded-2"
            onChange={(e) => setId(e.target.value)}
          >
            {listNameTheater.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <table className="table text-center">
            <thead>
              <tr>
                <th className="table__header" scope="col">
                  #
                </th>
                <th className="table__header" scope="col">
                  Tên phim
                </th>
                <th className="table__header" scope="col">
                  Thể loại
                </th>
                <th className="table__header" scope="col">
                  Thời lượng
                </th>
                <th className="table__header" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {listFilm.map((item, index) => {
                return (
                  <tr key={item._id} className="table__row">
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.category.toString()}</td>
                    <td>{item.duration} phút</td>
                    <td>
                      <button
                        className="btn border-light"
                        onClick={(e) => handleEdit(item._id)}
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        className="btn border-light"
                        data-bs-toggle="modal"
                        data-bs-target="#delete"
                        onClick={(e) => setIdFilm(item._id)}
                      >
                        <i className="fa-solid fa-trash-can text-danger"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {oneFilm && (
          <div className="col-md-12" ref={ref}>
            <h3 className="text-center text-success mt-2">
              THÔNG TIN CHI TIẾT
            </h3>
            <FilmDetails
              listTheater={listNameTheater}
              oneFilm={oneFilm}
              setIdFilm={setIdFilm}
              setCheck={handleSetCheck}
              setTextToast={handleSetTextToast}
            />
          </div>
        )}
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
                onClick={(e) => Delete()}
              >
                Tôi chắn chắn
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toast text={textToast} bg="bg-danger" id="fail" />
      <Toast text={textToast} bg="bg-success" id="success" />
    </div>
  );
}
