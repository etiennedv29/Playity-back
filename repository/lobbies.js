const Lobby = require("../models/lobbies");
const { Types } = require("mongoose");

const createLobby = async (params) => {
  const lobby = new Lobby(params);
  return await lobby.save();
};

const addPlayerToLobby = async (code, playerId) => {
  console.log(code, playerId, "addPlayerToLobby");

  return await Lobby.findOneAndUpdate(
    { code },
    { $addToSet: { players: playerId } }, //addtoSet permet de push dans un tableau de sous doc mais gère l'unicité
    { new: true } //récupérer la derniere version du lobby à jour
  ).populate("players");
};

const removePlayerToLobby = async (code, playerId) => {
  return await Lobby.findOneAndUpdate(
    { code },
    { $pull: { players: playerId } },
    { new: true }
  ).populate("players");
};

const getLobbyByCode = async (code) => {
  return Lobby.findOne({ code }).populate("players");
};

const getPlayersByLobbyId = async (lobbyId) => {
  let players = [];
  const data = await Lobby.findOne({_id: lobbyId});
  data.players.forEach((e) => {
    players.push(e);
  })
  return players;
}

module.exports = {
  createLobby,
  addPlayerToLobby,
  removePlayerToLobby,
  getLobbyByCode,
  getPlayersByLobbyId,
};
