const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date },
  amount: { type: Number },
  categoryId: { type: String },
  userId: { type: String },
});

module.exports = mongoose.model("records", recordSchema);
