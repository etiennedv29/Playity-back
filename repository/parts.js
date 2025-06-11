const Part = require("../models/parts");
const mongoose = require("mongoose");

// Fonction d'enregistrement d'une partie en BDD, dans la collection "parts"
const createPart = async (part) => {
  const newPart = await new Part(part);
  return newPart.save();
};

// Fonction d'enregistrement des scores d'un joueur donné pour une partie donnée
const savePartPlayersStats = async (
  partId,
  playerId,
  score,
  completedLines
) => {
  const data = await Part.findOneAndUpdate(
    { _id: partId },
    {
      $set: {
        "gamePartDetails.playersStats.$[elem].score": score,
        "gamePartDetails.playersStats.$[elem].completedLines": completedLines,
      },
    },
    {
      arrayFilters: [{ "elem.player": new mongoose.Types.ObjectId(playerId) }],
    }
  );

  if (!data) {
    return;
  }
};

// Fonction d'enregistrement des scores pour une partie donnée
const savePartStats = async (
  partId,
  teamScore,
  completedLines,
  numberOfPieces
) => {
  const data = await Part.findOneAndUpdate(
    { _id: partId },
    {
      $set: {
        "gamePartDetails.teamScore": teamScore,
        "gamePartDetails.completedLines": completedLines,
        "gamePartDetails.numberOfPieces": numberOfPieces,
      },
    }
  );

  if (!data) {
    return;
  }
};

const changePartStatus = async (partId) => {
  await Part.findOneAndUpdate({ _id: partId }, { status: "finished" });
};

module.exports = {
  createPart,
  savePartPlayersStats,
  savePartStats,
  changePartStatus,
};
