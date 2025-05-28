var express = require("express");
var router = express.Router();

const { createPartController, endPartController } = require("../controllers/parts");

router.post("/start", createPartController);

router.put("/end", endPartController)

module.exports = router;
