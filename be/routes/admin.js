const express = require("express");
const router = express.Router();

const AdminController = require("../controller/Admin");

router.post("/addTheaterAndRoom", AdminController.addTheaterAndRoom);
router.get("/getAllTheater", AdminController.getAllTheater);
router.get("/getOneTheaterById/:id", AdminController.getOneTheaterById);
router.put("/deleteTheaterById/:id", AdminController.deleteTheaterById); //update state
router.put("/updateTheaterById/:id", AdminController.updateTheaterById);
router.get("/getNameAndIdAllTheater", AdminController.getNameAndIdAllTheater);
router.post("/addFilm", AdminController.addFilm);
router.get("/getAllFilmsById/:id", AdminController.getAllFilmsById);
router.put("/deleteFilmById/:id", AdminController.deleteFilmById); //update state
router.put("/updateFilmById/:id", AdminController.updateFilmById);
router.get("/getAllUsers", AdminController.getAllUsers);
router.put("/deleteAccountById/:id", AdminController.deleteAccountById); //update state

module.exports = router;
