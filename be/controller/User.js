const UserModal = require("../models/User");
const nodemailer = require("nodemailer");

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
        if (result) {
          res.json(result);
        } else {
          res.status(404).send("Tên tài khoản hoặc mật khẩu không đúng");
          //Không chia trường hợp vì tính bảo mật
        }
      }
    );
  }

  // [POST] /user/resetPassword
  resetPassword(req, res, next) {
    UserModal.findOne({ email: req.body.email }, (err, result) => {
      if (result) {
        const options = {
          from: `VOSTRO CINEMA <${process.env.USER}>`,
          to: req.body.email,
          subject: "Code Verify",
          html: `
                <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
                <div style="max-width: 700px; background-color: white; margin: 0 auto">
                    <div style="width: 100%; background-color: #00efbc; padding: 20px 0; text-align: center;">
                        <h3 style="font-size: 1.5rem">VOSTRO CINEMA</h3>
                    </div>
                    <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
                  
                        <div style="font-size: 1.2rem; margin: 0 30px; text-align: center;">
                        ${
                          req.body.state === "getOTP"
                            ? `<p>Mã OTP của bạn là: <span style="font-weight: 700;">${req.body.otp}</span></p>`
                            : `<p>Mật khẩu của bạn là: <span style="font-weight: 700;">${result.password}</span></p>`
                        }
                        </div>
                    </div>
                </div>
                    `,
        };
        let transpoter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.USER, // email
            pass: process.env.PASSWORD, //password
          },
        });
        transpoter.sendMail(options).then((result) => res.json(result));
      } else {
        res.status(404).send("Email không tồn tại trong hệ thống");
      }
    });
  }
}
module.exports = new User();
