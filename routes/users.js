var express = require("express");
var router = express.Router();

const { login, register } = require("../controllers/users");

router.post("/register", register);
router.post("/login", login);


module.exports = router;
