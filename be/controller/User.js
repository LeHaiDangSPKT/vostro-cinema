const UserModal = require("../models/User");

class User {
  // [POST] /user/signIn
  signIn(req, res, next) {
    UserModal.findOne(
      {
        $or: [
          { username: req.body.username },
          { phoneNumber: req.body.phoneNumber },
          { email: req.body.email },
        ],
      },
      (err, result) => {
        if (result) {
          if (req.body.username == result.username) {
            res.status(404).send("Tên tài khoản đã tồn tại");
          } else if (req.body.phoneNumber == result.phoneNumber) {
            res.status(404).send("Số điện thoại đã tồn tại");
          } else {
            res.status(404).send("Email đã tồn tại");
          }
        } else {
          const user = req.body;
          const newUser = new UserModal(user);
          newUser.save();
          res.json(user);
        }
      }
    );
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
        console.log(result);
        if (result) {
          res.json(result);
        } else {
          res.status(404).send("Tên tài khoản hoặc mật khẩu không đúng");
          //Không chia trường hợp vì tính bảo mật
        }
      }
    );
  }
}

module.exports = new User();
