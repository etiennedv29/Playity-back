const { checkBody } = require("../utils/string");
const { getGames: getGamesDB } = require("../repository/games");

const getGames = async (req, res, next) => {
  try {
    const games = await getGamesDB({ ...req.params });

    res.json(games);
  } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getGames };
