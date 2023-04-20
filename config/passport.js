const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  //* 初始化設定
  app.use(passport.initialize());
  app.use(passport.session());

  //* 設定本地驗證機制
  passport.use(
    new localStrategy({ usernameField: "name" }, (name, password, done) => {
      User.findOne({ name })
        .then((user) => {
          if (!user) return done(null, false, { message: "user doesn't exit" });
          bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
              return done(null, false, { message: "password is incorrect" });
          });
          return done(null, user);
        })
        .catch((err) => done(err, false));
    })
  );

  //* 序列化及反序列化

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
