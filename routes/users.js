var express = require("express");
var router = express.Router();

const { login, register,findUserByToken } = require("../controllers/users");

router.post("/register", register);
router.post("/login", login);
router.get("/:token",findUserByToken)

module.exports = router;
