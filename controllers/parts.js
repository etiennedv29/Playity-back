const { createPart } = require('../repository/parts');
const { getPlayersByLobbyId } = require('../repository/lobbies');
const { getGamePartDetail } = require('../repository/gamesPartDetails');
const { savePartPlayersStats, savePartStats, changePartStatus } = require('../repository/parts');

// Fonction de création d'une nouvelle partie
const createPartController = async (req, res, next) => {
    try {
    
    // On récupère les IDs des joueurs du lobby dans players, puis on initialise l'objet gamePartDetails en fonction des spécificités du jeu ( exemple : Multitris = possède la statistique nombre de lignes)
    const players = await getPlayersByLobbyId(req.body.lobbyId);
    const gamePartDetails = await getGamePartDetail(req.body.gameId, players);

    if (!gamePartDetails) {
        res.json({ error: "No game details found"})
    }

    // On définit une nouvelle partie avec comme propriétés les gamePartDetails définis précédemment
    const part = {
        game: req.body.gameId,
        lobby: req.body.lobbyId,
        status: "ongoing",
        gamePartDetails: { ...gamePartDetails }
    };

    // On enregistre la partie initialisée dans la collection parts de la BDD, grâce à la fonction createPart
    const newPart = await createPart(part);

    res.json({ partId: newPart._id });

    } catch (exception) {
    res.status(500).json({ error: "Une erreur s'est produite" });
    }
}

// Fonction d'enregistrement de fin de partie
const endPartController = async (partId, gamePartDetails) => {
    try {

        // On passe le statut de la partie de "ongoing" à "finished"
        changePartStatus(partId);

        // On enregistre les scores de la partie
        savePartStats(partId,gamePartDetails.teamScore, gamePartDetails.completedLines,gamePartDetails.numberOfPieces);
        for (let i = 0; i < gamePartDetails.playersStats.length; i++) {
            savePartPlayersStats(partId,gamePartDetails.playersStats[i].player,gamePartDetails.playersStats[i].score, gamePartDetails.playersStats[i].completedLines);
        }
        
    } catch (exception) {
        res.status(500).json({ error: "Une erreur s'est produite" });
    }

}

module.exports = { createPartController, endPartController }