const express = require("express");
const router = express.Router();

const UserController = require("../controller/Admin");

router.post("/addTheaterAndRoom", UserController.addTheaterAndRoom);
router.get("/getAllTheater", UserController.getAllTheater);
router.get("/getOneTheaterById/:id", UserController.getOneTheaterById);
router.delete("/deleteTheaterById/:id", UserController.deleteTheaterById);
router.put("/updateTheaterById/:id", UserController.updateTheaterById);
module.exports = router;
