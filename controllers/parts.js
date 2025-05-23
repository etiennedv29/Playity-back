const { createPart } = require('../repository/parts');
const { getLobbyByCode } = require('../repository/lobbies');
const { getGamePartDetail } = require('../repository/gamesPartDetails');

const createPartController = async (req, res, next) => {
    try {

    console.log('gameId:', req.body.gameId);
    console.log('lobbyCode:', req.body.lobbyCode);

    const lobby = await getLobbyByCode(req.body.lobbyCode);

    if (!lobby) {
      console.error('Lobby not found for code:', req.lobbyCode);
      return res.status(404).json({ error: 'Lobby not found' });
    }

    const lobbyId = lobby._id;
    console.log('Id du lobby : ', lobbyId)
    const gamePartDetails = await getGamePartDetail(req.body.gameId);

    if (!gamePartDetails) {
        res.json({ error: "No game details found"})
    }

    const part = {
        game: req.body.gameId,
        lobby: lobbyId,
        status: "ongoing",
        gamePartDetails: {...gamePartDetails }
    };

    await createPart(part);

    res.json({ partId: part._id });

    } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { createPartController }