const express = require("express");
const router = express.Router();
const Record = require("../../models/Record");
const Category = require("../../models/Category");

//* 新增紀錄
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/", (req, res) => {
  const record = req.body;
  Category.findOne({ name: record.category })
    .then((category) => {
      Record.create({ ...record, categoryId: category._id }).then(() =>
        res.redirect("/")
      );
    })
    .catch((err) => console.log(err));
});

module.exports = router;
