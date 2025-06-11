const PartDetails = require("../models/gamesPartDetails");
const mongoose = require("mongoose");

// Fonction de récupération des types de statistique d'un joueur, pour un type de jeu donné
// Exemple : Dans le jeu Multitris, les stats d'un joueur seront le score, le nombre de pièces jouées, et le nombre de lignes complétées
const getPlayerStats = (e) => {
  const playerStat = {};
  const properties = {
    string: "",
    number: 0,
    objectid: null,
  };

  // Pour chaque type de propriété, initialise la stat du joueur avec sa valeur par défaut, indiquée dans l'objet de référence properties
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
 * Fonction qui vient récupérer les types de statitiques pour un jeu donné
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

  // Si l'id de la game n'est pas trouvé, on ne fait rien
  if (!data) {
    return;
  }

  const details = await data.details;
  const allPlayersStats = [];
  let playerStats = {};

  // Pour chaque joueur de la partie, on initialise ses statistiques, on ajoute son ID dans la propriété player, puis on l'ajoute dans le tableau gloabl des stats de joueurs "allPlayerStats"
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
