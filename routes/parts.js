var express = require("express");
var router = express.Router();

const { createPartController } = require("../controllers/parts");

router.post("/start", createPartController);

module.exports = router;
