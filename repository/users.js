const User = require("../models/users");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

const getUserByEmail = async (email) => {
  return await User.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  });
};

const userRegister = async ({
  username,
  password,
  firstName,
  lastName,
  email,
  avatar,
  connectionWithSocials,
}) => {
  let hash = "";
  if (connectionWithSocials === false) {
    hash = bcrypt.hashSync(password, 10);
  }

  const newUser = new User({
    username,
    firstName,
    lastName,
    email,
    password: hash,
    token: uid2(32),
    avatar,
    connectionWithSocials,
    roles: ["guest", "member"],
  });

  return await newUser.save();
};

const checkToken = async (token) => {
  const user = await User.findOne({ token });
  console.log(user, !!user);
  return !!user;
};

const guestRegister = async ({ username, avatar }) => {
  let hash = "";

  const newUser = new User({
    username,
    password: hash,
    token: uid2(32),
    avatar,
    roles: ["guest"],
  });

  return await newUser.save();
};

const getUsers = async (params) => await User.find(params);

module.exports = {
  userRegister,
  checkToken,
  getUserByEmail,
  getUsers,
  guestRegister,
};
