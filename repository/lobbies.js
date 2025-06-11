const Lobby = require("../models/lobbies");

/**
 * Create Lobby request
 *
 * @param {*} params
 * @returns
 */
const createLobby = async (params) => {
  const lobby = new Lobby(params);
  return await lobby.save();
};

/**
 * Add player to an existing lobby request
 *
 * @param {*} code
 * @param {*} playerId
 * @returns
 */
const addPlayerToLobby = async (code, playerId) => {
  return await Lobby.findOneAndUpdate(
    { code },
    { $addToSet: { players: playerId } }, // addtoSet permet de push dans un tableau de sous doc mais gère l'unicité
    { new: true } // Récupérer la derniere version du lobby à jour
  ).populate("players");
};

/**
 * Remove player to an existing lobby request
 *
 * @param {*} code
 * @param {*} playerId
 * @returns
 */
const removePlayerToLobby = async (code, playerId) => {
  return await Lobby.findOneAndUpdate(
    { code },
    { $pull: { players: playerId } },
    { new: true }
  ).populate("players");
};

/**
 * Get lobby by code request
 *
 * @param {*} code
 * @returns
 */
const getLobbyByCode = async (code) => {
  return Lobby.findOne({ code }).populate("players");
};

/**
 * Fonction qui permet de récupérer les IDs des joueurs d'un lobby avec l'ID de ce lobby
 *
 * @param {*} lobbyId
 * @returns
 */
const getPlayersByLobbyId = async (lobbyId) => {
  let players = [];
  const data = await Lobby.findOne({ _id: lobbyId });
  data.players.forEach((e) => {
    players.push(e);
  });
  return players;
};

module.exports = {
  createLobby,
  addPlayerToLobby,
  removePlayerToLobby,
  getLobbyByCode,
  getPlayersByLobbyId,
};
