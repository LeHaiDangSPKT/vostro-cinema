const express = require("express");
const router = express.Router();

const AdminController = require("../controller/Admin");

router.post("/addTheaterAndRoom", AdminController.addTheaterAndRoom);
router.get("/getAllTheater", AdminController.getAllTheater);
router.get("/getOneTheaterById/:id", AdminController.getOneTheaterById);
router.delete("/deleteTheaterById/:id", AdminController.deleteTheaterById);
router.put("/updateTheaterById/:id", AdminController.updateTheaterById);
router.get("/getNameAndIdAllTheater", AdminController.getNameAndIdAllTheater);
router.post("/addFilm", AdminController.addFilm);
router.get("/getAllFilmsById/:id", AdminController.getAllFilmsById);
router.delete("/deleteFilmById/:id", AdminController.deleteFilmById);
router.put("/updateFilmById/:id", AdminController.updateFilmById);

module.exports = router;
