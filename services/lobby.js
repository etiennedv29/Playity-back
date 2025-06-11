const codeLength = 5;

const { createLobby: createLobbyDB } = require("../repository/lobbies");

/**
 * Create Lobby in database
 *
 * @param {*} adminId
 * @param {*} nbPlayers
 * @returns
 */
const createLobby = async (adminId, nbPlayers) => {
  const code = generateRandomCode(codeLength);

  return await createLobbyDB({ admin: adminId, nbPlayers, code });
};

/**
 * Generate random code
 *
 * @param {*} length
 * @returns
 */
function generateRandomCode(length) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    code += letters[randomIndex];
  }
  return code;
}

module.exports = { createLobby };
