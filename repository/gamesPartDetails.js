const PartDetails = require("../models/gamesPartDetails");
const mongoose = require("mongoose");

const getPlayerStats = (e) => {
  const playerStat = {};
  const properties = {
    string: "",
    number: 0,
    objectid: null,
  };

  if (
    e.options.includes("required") &&
    e.propertyType.toLowerCase() === "objectid"
  ) {
    playerStat[e.property] = properties[e.propertyType.toLowerCase()];
  } else if (
    e.options.includes("required") &&
    e.propertyType.toLowerCase() === "number"
  ) {
    playerStat[e.property] = properties[e.propertyType.toLowerCase()];
  } else if (
    e.options.includes("required") &&
    e.propertyType.toLowerCase() === "string"
  ) {
    playerStat[e.property] = properties[e.propertyType.toLowerCase()];
  }

  return playerStat;
};

// On injectera ensuite cet objet dans la propriété gameStatistics
// Exemple de paramètre d'entrée : "245425d11452ds154cd"
// Exemple de sortie :
// {
//  propriété1: 0, (type number)
//  propriété2 : "", (type string)
//  propriété3 : 0, (type number)
// }

/**
 * Fonction qui vient récupérer les types de statitique pour un jeu donné
 *
 * @param {*} gameId
 * @param {*} players
 * @returns
 */
const getGamePartDetail = async (gameId, players) => {
  // On initialise un objet de correspondance des propriétés
  let gameProperties = {};

  const properties = {
    string: "",
    number: 0,
  };

  const data = await PartDetails.findOne({
    gameId: new mongoose.Types.ObjectId(gameId),
  });

  // Si l'id de la game n'est pas trouvé
  if (!data) {
    return;
  }

  const details = await data.details;
  const allPlayersStats = [];
  let playerStats = {};

  for (let i = 0; i < players.length; i++) {
    data.playersStats.forEach((e) => {
      playerStats = { ...playerStats, ...getPlayerStats(e) };
    });
    playerStats.player = players[i];

    allPlayersStats.push(playerStats);
  }

  details.forEach((e) => {
    if (
      e.options.includes("required") &&
      e.propertyType.toLowerCase() === "string"
    ) {
      gameProperties[e.property] = properties[e.propertyType.toLowerCase()];
    } else if (
      e.options.includes("required") &&
      e.propertyType.toLowerCase() === "number"
    ) {
      gameProperties[e.property] = properties[e.propertyType.toLowerCase()];
    }
  });

  gameProperties.playersStats = allPlayersStats;

  return gameProperties;
};

module.exports = { getGamePartDetail };
