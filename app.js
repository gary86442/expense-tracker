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
const PORT = process.env.PORT;
const app = express();
//* 設定模板引擎
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
//* 設定靜態路徑
app.use(express.static("public"));

//* 使用路由器
app.use(router);

//* 啟動並監聽伺服器
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
