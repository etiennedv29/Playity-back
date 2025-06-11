const { getUsers } = require("../repository/users");

/**
 * Get User with token
 *
 * @param {*} token
 * @returns
 */
const getUserByToken = async (token) => {
  const users = await getUsers({ token });

  return users[0];
};

module.exports = { getUserByToken };
