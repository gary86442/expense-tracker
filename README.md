# 餐廳清單 3.0

使用者申請帳號並自行記錄餐廳資訊，亦可用 Facebook 或是 Google 帳號來進行註冊

## 專案畫面

![image](https://github.com/gary86442/expense-tracker/blob/main/public/img/index.png)

![image](https://github.com/gary86442/expense-tracker/blob/main/public/img/login.png)

## 功能列表

- 註冊帳號:註冊帳號已分別記錄個人的支出
- 登入後，可以新增、修改、刪除支出紀錄
- 可以依據分類來呈現支出紀錄及總金額。

## 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/gary86442/expense-tracker.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件

在 Terminal 輸入

```
 npm install
```

4. 填寫環境變數

在資料夾中，找到.env.example，其中變數套用個人之變數。

```
#自訂路由
PORT = 3000
#填入你的 mongoDB的資路庫連線URI
MONGODB_URI=
#自訂SESSION的密碼
SESSION =
```

5. 匯入種子檔案

在 Terminal 執行 Seeder.js 檔案， 匯入使用者與餐廳資料

```

npm run seed
```

當 terminal 出現以下字樣，即表示種子資料已新增至資料庫。

> Mongodb is connected!

> categorySeed is done!

> Mongodb is connected!

> recordSeeder is done!

6. 啟動伺服器，執行 app.js 檔案

```
npm run start
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

> listening on http://localhost:${PORT}`

> Mongodb is connected!

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用。

8. 以測試帳號或註冊帳號來使用網站，

> 帳號：dad
> 密碼：000000

## 開發者

> [Gary](https://github.com/gary86442)
