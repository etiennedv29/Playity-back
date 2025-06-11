const { getGameById } = require("../repository/games");

/**
 * Check if the playerNumber doesn't exceed the game max nbPlayers
 *
 * @param {*} gameId
 * @param {*} nbPlayers
 * @returns
 */
const checkPlayerNumber = async (gameId, nbPlayers) => {
  const game = await getGameById(gameId);
  return nbPlayers <= game.maxPlayers;
};

module.exports = { checkPlayerNumber };
