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

const updateUserAccount = async (infos) => {
  const { id, username, email, name, birthday } = infos;
  const updateFields = {};

  if (username) updateFields.username = username;
  if (email) updateFields.email = email;
  if (name) updateFields.name = name;
  if (birthday) updateFields.birthday = birthday;

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { $set: updateFields },
    { new: true } // renvoie le document modifié
  );
  return updatedUser;
};

module.exports = {
  userRegister,
  checkToken,
  getUserByEmail,
  getUsers,
  guestRegister,
  updateUserAccount,
};
