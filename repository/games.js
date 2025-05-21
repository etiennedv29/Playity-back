const Game = require("../models/games");

const getGameById = async (id) => await Game.findById(id);

const getGames = async (params) => await Game.find(params);

module.exports = { getGameById, getGames };
