const express = require("express");
const exphbs = require("express-handlebars");
//* 載入環境變數
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//* 載入路由器
const router = require("./routes");
//* 載入資料庫
require("./config/mongoose");
//* 載入method-override
const methodOverride = require("method-override");
//* 載入身分驗證相關
const session = require("express-session");
const usePassport = require("./config/passport");

//* 載入快閃訊息提示
const flash = require("connect-flash");

const PORT = process.env.PORT;
const app = express();
//* 設定模板引擎
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      match: (a, b) => a === b,
    },
  })
);
app.set("view engine", "hbs");
//* 設定靜態路徑
app.use(express.static("public"));
//* 可讀取req.body, 搜尋方式是用字串
app.use(express.urlencoded({ extended: true }));
//* 路由語意化，關鍵字設定為 _method
app.use(methodOverride("_method"));

//* 使用者驗證相關
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true,
  })
);
usePassport(app);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg").length
    ? req.flash("error_msg")
    : req.flash("error");

  next();
});

//* 使用路由器
app.use(router);

//* 啟動並監聽伺服器
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
