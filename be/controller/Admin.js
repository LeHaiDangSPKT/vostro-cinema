const TheaterModal = require("../models/Theater");

class Admin {
  //[GET] /admin/getAllTheater
  getAllTheater(req, res, next) {
    TheaterModal.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }

  // [GET] /admin/getOneTheaterById/:id
  getOneTheaterById(req, res, next) {
    TheaterModal.find({ _id: req.params.id }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }
  // [POST] /admin/addTheaterAndRoom
  addTheaterAndRoom(req, res, next) {
    TheaterModal.findOne({ name: req.body.name }, (err, result) => {
      if (result) {
        res.status(404).send("Rạp phim đã tồn tại");
      } else {
        const theater = req.body;
        const newTheater = new TheaterModal(theater);
        newTheater.save();
        res.json(theater);
      }
    });
  }

  // [POST] /user/logIn
  logIn(req, res, next) {
    UserModal.findOne(
      {
        $and: [
          { username: req.body.username },
          { password: req.body.password },
        ],
      },
      (err, result) => {
        if (result) {
          res.json(result);
        } else {
          res.status(404).send("Tên tài khoản hoặc mật khẩu không đúng");
          //Không chia trường hợp vì tính bảo mật
        }
      }
    );
  }

  //[DELETE] /user/deleteTheaterById/:id
  deleteTheaterById(req, res, next) {
    TheaterModal.deleteOne({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch(next);
  }

  //[PUT] /manager/updateTheaterById/:id
  updateTheaterById(req, res, next) {
    var theater = req.body;
    theater.room = req.body.room.map((item) => item);
    TheaterModal.updateOne({ _id: req.params.id }, theater)
      .then((result) => res.json(result))
      .catch(next);
  }
}

module.exports = new Admin();
