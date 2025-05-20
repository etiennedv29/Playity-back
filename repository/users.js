const User = require("../models/users");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

const getUserByUsername = async (username) => {
  return await User.findOne({
    username: { $regex: new RegExp("^" + username + "$", "i") },
  });
};

const userSignup = async ({ username, password, firstname }) => {
  const hash = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    firstname,
    password: hash,
    token: uid2(32),
  });

  return await newUser.save();
};

const checkToken = async (token) => {
  const user = await User.findOne({ token });
  console.log(user, !!user);
  return !!user;
};

module.exports = { userSignup, checkToken, getUserByUsername };
