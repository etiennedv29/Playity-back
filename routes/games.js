var express = require("express");
var router = express.Router();

const { getGames } = require("../controllers/games");

router.get("/", getGames);

module.exports = router;
