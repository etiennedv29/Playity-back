const { getUsers } = require("../repository/users");

const getUserByToken = async (token) => {
  const users = await getUsers({ token });

  return users[0];
};

module.exports = { getUserByToken };
