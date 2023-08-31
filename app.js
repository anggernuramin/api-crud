require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
const { PORT } = process.env;
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reviewRouter = require("./routes/review");
const { nextTick } = require("process");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// solving cors policy
// dengan mengizinkan api bisa diakses di jaringan lain dengan mengset header dan memberikan akses
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next(); // Pastikan Anda menyertakan next() untuk melanjutkan ke langkah berikutnya
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/review", reviewRouter);

app.listen(PORT);
console.log("server in port 3000");

module.exports = app;
// "start": "node ./bin/www",
