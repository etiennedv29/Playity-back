const { getUserByToken } = require("../services/users");
const { createLobby: createLobbyService } = require("../services/lobby");
const { checkBody } = require("../utils/string");
const { checkPlayerNumber } = require("../services/games");

const createLobby = async (req, res, next) => {
  try {
    if (!checkBody(req.body, ["nbPlayers", "gameId"])) {
      return res.status(400).json({ error: "Missing or empty fields" });
    }

    if (!(await checkPlayerNumber(req.body.gameId, req.body.nbPlayers))) {
      return res.status(400).json({ error: "Number of player exceeded" });
    }

    const token = req.headers.authorization;
    const user = await getUserByToken(token);
    const lobby = await createLobbyService(user._id, req.body.nbPlayers);

    res.json({ code: lobby.code });
  } catch (exception) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createLobby };
