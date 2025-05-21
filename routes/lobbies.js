var express = require("express");
var router = express.Router();

const { createLobby } = require("../controllers/lobbies");

router.post("/", createLobby);

module.exports = router;
