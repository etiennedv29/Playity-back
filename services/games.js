const { getGameById } = require("../repository/games");

const checkPlayerNumber = async (gameId, nbPlayers) => {
  const game = await getGameById(gameId);
  return nbPlayers <= game.maxPlayers;
};

module.exports = { checkPlayerNumber };
