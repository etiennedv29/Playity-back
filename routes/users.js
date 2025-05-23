var express = require("express");
var router = express.Router();

const { login, register, registerGuest } = require("../controllers/users");

router.post("/register", register);
router.post("/register-guest", registerGuest);
router.post("/login", login);

module.exports = router;
