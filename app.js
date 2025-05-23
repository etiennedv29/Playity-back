var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
require("./models/connection");
const cors = require("cors");

var usersRouter = require("./routes/users");
var lobbiesRouter = require("./routes/lobbies");
var gamesRouter = require("./routes/games");
var partsRouter = require("./routes/parts");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/lobbies", lobbiesRouter);
app.use("/games", gamesRouter);
app.use("/parts", partsRouter);

module.exports = app;
