const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
//* 登入
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

//*登出
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "你已經成功登出");
    res.redirect("/users/login");
  });
});

//* 註冊
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, password, confirmPassword } = req.body;
  User.findOne({ name })
    .then((user) => {
      if (user) {
        req.flash("error_msg", "該帳號已經存在！");
        return res.redirect("register");
      }
      if (password !== confirmPassword) {
        req.flash("error_msg", "密碼與確認密碼不同！");
        return res.redirect("register");
      }

      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          User.create({ name, password: hash }).then(() => {
            req.flash("success_msg", "您已經成功註冊帳號！");
            res.redirect("/");
          });
        });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
