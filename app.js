var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
const db = require("./src/models/DB");

var app = express();
app.set('view engine', 'ejs');
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 데이터베이스 연결 확인 및 동기화
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return db.sequelize.sync({
      force: false,
    });
  })
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/api", indexRouter);
app.use("/users", usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(res.locals)
});

module.exports = app;
