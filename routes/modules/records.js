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
  const userId = req.user._id;
  Category.findOne({ name: record.category })
    .then((category) => {
      Record.create({ ...record, categoryId: category._id, userId }).then(() =>
        res.redirect("/")
      );
    })
    .catch((err) => console.log(err));
});

//* 修改支出紀錄
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  Record.findById(id)
    .lean()
    .then((record) => {
      record.date = record.date.toISOString().substring(0, 10);
      Category.findById(record.categoryId).then((category) => {
        record.category = category.name;
        res.render("edit", { record });
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const record = req.body;
  Category.findOne({ name: record.category })
    .then((category) => {
      record.categoryId = category._id;
      return Record.findByIdAndUpdate(id, { ...record });
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//* 刪除支出紀錄
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Record.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
