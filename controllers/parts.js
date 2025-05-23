const { createPart } = require('../repository/parts');
const { getLobbyByCode } = require('../repository/lobbies');
const { getGamePartDetail } = require('../repository/gamesPartDetails');

const createPartController = async (req, res, next) => {
    console.log('body:', req.body);
    try {
    

    // const lobby = await getLobbyByCode(req.body.lobbyCode);

    // if (!lobby) {
    //   console.error('Lobby not found for code:', req.lobbyCode);
    //   return res.status(404).json({ error: 'Lobby not found' });
    // }

    const gamePartDetails = await getGamePartDetail(req.body.gameId, req.body.maxPlayers);

    if (!gamePartDetails) {
        res.json({ error: "No game details found"})
    }

    const part = {
        game: req.body.gameId,
        lobby: req.body.lobbyId,
        status: "ongoing",
        gamePartDetails: { ...gamePartDetails }
    };

    const newPart = await createPart(part);

    res.json({ partId: newPart._id });

    } catch (exception) {
    console.log(exception);
    res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { createPartController }