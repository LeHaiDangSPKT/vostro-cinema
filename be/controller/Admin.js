const TheaterModel = require("../models/Theater");
const FilmModel = require("../models/Film");
const UserModel = require("../models/User");
const ServiceModel = require("../models/Service");

class Admin {
  //[GET] /admin/getAllTheater
  getAllTheater(req, res, next) {
    TheaterModel.find({ state: true }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }

  // [GET] /admin/getOneTheaterById/:id
  getOneTheaterById(req, res, next) {
    TheaterModel.find({ _id: req.params.id, state: true }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }
  // [POST] /admin/addTheaterAndRoom
  addTheaterAndRoom(req, res, next) {
    TheaterModel.findOne({ name: req.body.name }, (err, result) => {
      if (result) {
        res.status(404).send("Rạp phim đã tồn tại");
      } else {
        const theater = req.body;
        const newTheater = new TheaterModel(theater);
        newTheater.save();
        res.json(theater);
      }
    });
  }

  //[UPDATE] /admin/deleteTheaterById/:id
  deleteTheaterById(req, res, next) {
    TheaterModel.updateOne({ _id: req.params.id }, { state: false })
      .then((result) => res.json(result))
      .catch(next);
  }

  //[PUT] /admin/updateTheaterById/:id
  updateTheaterById(req, res, next) {
    var theater = req.body;
    theater.room = req.body.room.map((item) => item);
    TheaterModel.updateOne({ _id: req.params.id }, theater)
      .then((result) => res.json(result))
      .catch(next);
  }

  // [GET] /admin/getNameAndIdAllTheater
  getNameAndIdAllTheater(req, res, next) {
    TheaterModel.find({ state: true }, { name: 1 }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }

  // [POST] /admin/addFilm
  addFilm(req, res, next) {
    FilmModel.findOne({ name: req.body.name }, (err, result) => {
      if (result) {
        res.status(404).send("Phim đã tồn tại");
      } else {
        const film = req.body;
        const newFilm = new FilmModel(film);
        newFilm.save();
        res.json(film);
      }
    });
  }

  //[GET] /admin/getAllFilmsById/:id
  getAllFilmsById(req, res, next) {
    FilmModel.find({ theaterId: req.params.id, state: true }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }

  //[UPDATE] /admin/deleteFilmById/:id
  deleteFilmById(req, res, next) {
    FilmModel.updateOne({ _id: req.params.id }, { state: false })
      .then((result) => res.json(result))
      .catch(next);
  }

  //[UPDATE] /admin/updateFilmById/:id
  updateFilmById(req, res, next) {
    var film = req.body;
    film.category = req.body.category.map((item) => item);
    FilmModel.updateOne({ _id: req.params.id }, film)
      .then((result) => res.json(result))
      .catch(() => {
        res.status(404).send(`Không tìm thấy phim ${req.params.name}`);
      });
  }

  //[GET] /admin/getAllUsers
  getAllUsers(req, res, next) {
    UserModel.find({ state: true }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }

  // [UPDATE] //admin/deleteAccountById/:id
  deleteAccountById(req, res, next) {
    UserModel.updateOne({ _id: req.params.id }, { state: false })
      .then((result) => res.json(result))
      .catch(next);
  }

  //[GET] /admin/getChairService
  getChairService(req, res, next) {
    ServiceModel.find({}, { chair: 1 }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }
}

module.exports = new Admin();
