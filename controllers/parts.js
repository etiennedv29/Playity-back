const { createPart } = require('../repository/parts');
const { getPlayersByLobbyId } = require('../repository/lobbies');
const { getGamePartDetail } = require('../repository/gamesPartDetails');
const { savePartPlayersStats, savePartStats } = require('../repository/parts');

const createPartController = async (req, res, next) => {
    try {
    
    const players = await getPlayersByLobbyId(req.body.lobbyId);
    const gamePartDetails = await getGamePartDetail(req.body.gameId, players);

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

const endPartController = async (req, res, next) => {
    try {
        console.log('ending game...');

        savePartStats(req.body.gamePartDetails.teamScore, req.body.gamePartDetails.completedLines);
        for (let i = 0; i < req.body.gamePartDetails.playersStats.length; i++) {
            savePartPlayersStats(req.body.partId, req.body.gamePartDetails);
        }
        
    } catch (exception) {
        console.log(exception);
        res.status(500).json({ error: "Une erreur s'est produite" });
    }

}

module.exports = { createPartController, endPartController }