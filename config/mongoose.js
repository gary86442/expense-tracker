const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.once("open", () => console.log("mongoDB is connecting"));
db.on("error", () => console.log("mongoDB error!"));

module.exports = db;
