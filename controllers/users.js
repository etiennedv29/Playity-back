const { userRegister, getUserByEmail } = require("../repository/users");
const { checkBody } = require("../utils/string");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    if (!checkBody(req.body, ["username", "password","email","firstName","lastName"])) {
      return res.status(400).json({ error: "Missing or empty fields" });
    }

    const user = await getUserByEmail(req.body.email.toLowerCase());

    if (user === null) {
      const userObject = await userRegister(req.body);
      res.json(userObject);
    } else {
      res.status(409).json({ error: "User already exists" });
    }
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  try {
    if (!checkBody(req.body, ["email", "password"])) {
      return res.status(400).json({ error: "Missing or empty fields" });
    }
console.log(req.body.email)
    const user = await getUserByEmail(req.body.email.toLowerCase());
    console.log(user)

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json(user);
    } else {
      res.json.status(401).json({ error: "User not found or wrong password" });
    }
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login };
