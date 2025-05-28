const Part = require('../models/parts');
const { Types } = require("mongoose");
const mongoose = require('mongoose');

const createPart = async (part) => {
    const newPart = await new Part(part);
    return newPart.save();
}


const savePartPlayersStats = async (partId, playerId, score, completedLines) => {
    console.log("dans repo trying to update les joueurs, partID=>", partId)
    const data = await Part.findOneAndUpdate(
        {_id: partId},
        {
            $set: {
            "gamePartDetails.playersStats.$[elem].score": score,
            "gamePartDetails.playersStats.$[elem].completedLines": completedLines,
            }
        },
        {
            arrayFilters: [{ "elem.player": new mongoose.Types.ObjectId(playerId) }]
        }
    );
    if (!data) {
        return;
    }
}

const savePartStats = async (partId, teamScore, completedLines, numberOfPieces ) => {
        const data = await Part.findOneAndUpdate(
            {_id: partId},
            {
                $set: {
                    "gamePartDetails.teamScore": teamScore,
                    "gamePartDetails.completedLines": completedLines,
                   "gamePartDetails.numberOfPieces": numberOfPieces
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