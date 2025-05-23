const { userRegister, getUserByEmail } = require("../repository/users");
const { guestRegister } = require("../repository/users");

const { checkBody } = require("../utils/string");
const bcrypt = require("bcrypt");

const registerGuest = async (req, res, next) => {
  try {
    //Generation aléatoire de userName
    const username = "Guest" + Math.floor(Math.random() * 99999999) + 1;

    //generation aléatoire de l'avatar
    const seed = Math.random().toString(36).substring(2, 12);
    const avatar = `https://api.dicebear.com/7.x/adventurer/png?seed=${seed}`;

    //saving the user with its avatar generated
    const userObject = await guestRegister({ avatar, username });
    res.json(userObject);
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const register = async (req, res, next) => {
  console.log(req.body);
  try {
    if (
      !req.body.connectionWithSocials &&
      !checkBody(req.body, [
        "username",
        "password",
        "email",
        "firstName",
        "lastName",
      ])
    ) {
      return res.status(400).json({ error: "Missing or empty fields" });
    }

    const user = await getUserByEmail(req.body.email.toLowerCase());

    if (user === null) {
      //generation aléatoire de l'avatar
      const seed = Math.random().toString(36).substring(2, 12);
      const avatar = `https://api.dicebear.com/7.x/adventurer/png?seed=${seed}`;

      //saving the user with its avatar generated
      const userObject = await userRegister({ avatar, ...req.body });
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
  console.log(req.body);
  try {
    if (
      !req.body.connectionWithSocials &&
      !checkBody(req.body, ["email", "password"])
    ) {
      return res.status(400).json({ error: "Missing or empty fields" });
    }

    const user = await getUserByEmail(req.body.email.toLowerCase());
    console.log("user found at login=", user);

    if (
      user &&
      user.connectionWithSocials === false &&
      bcrypt.compareSync(req.body.password, user.password)
    ) {
      res.json(user);
    } else if (user && user.connectionWithSocials === true) {
      res.json(user);
    } else {
      res.status(401).json({ error: "User not found or wrong password" });
    }
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findUserByEmail = async (req, res, next) => {
  console.log("get user by email=", req.params.email);
  try {
    const user = await getUserByEmail(req.params.email);
    res.json(user);
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, registerGuest, login, findUserByEmail };
