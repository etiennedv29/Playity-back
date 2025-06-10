const { getGames: getGamesDB } = require("../repository/games");

const getGames = async (req, res, next) => {
  try {
    const lobby = await getGamesDB({ ...req.query });
    res.json(lobby);
  } catch (exception) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getGames };
