const express = require("express");
const router = express.Router();

const UserController = require("../controller/User");

router.post("/signIn", UserController.signIn);
router.post("/logIn", UserController.logIn);

module.exports = router;
