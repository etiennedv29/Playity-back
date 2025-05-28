const Part = require('../models/parts');

const createPart = async (part) => {
    const newPart = await new Part(part);
    return newPart.save();
}

// Assigner à chaque playerStat de la partie l'Id d'un joueur du lobby
// const setPlayersIds = async (partId, arr) => {
//     const part = await PartDetails.findById({_id: partId})    
    
//     for (let i = 0; i < arr.length; i++) {
//         part.playersStats[i].player = arr[i];
//     }
// }

const savePartPlayersStats = async (partId, playerId, score, completedLines) => {
    const data = await Part.updateOne(
        {_id: partId},
        {
            $inc: {
            "playersStats.$[elem].score": score,
            "playersStats.$[elem].score": completedLines,
            }
        },
        {
            arrayFilters: [{ "elem.player": playerId }]
        }
    );
    if (!data) {
        return;
    }
}

const savePartStats = async (partId, teamScore, completedLines, numberOfPieces ) => {
        const data = await Part.updateOne(
            {_id: partId},
            {
                $set: {
                    teamScore: teamScore,
                    completedLines: completedLines,
                    numberOfPieces: numberOfPieces
                }
            }
        )
        if (!data) {
            return;
        }
}

const changePartStatus = async (partId) => {
    const data = await Part.findOneAndUpdate(
        {_id: partId},
        {status: "finished"}
    )
}

module.exports = { createPart, savePartPlayersStats, savePartStats, changePartStatus }