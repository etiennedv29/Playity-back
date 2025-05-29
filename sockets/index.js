const registerLobbyHandlers = require("./lobby");
const {spawnPiece} = require("./multitris");
const {gameStart} = require("./multitris");
const {communicateMovingPieces}= require("./multitris");
const {updateScores} = require("./multitris");
const {endGame} = require("./multitris")
const {removeCompletedLines}= require("./multitris")
const User = require("../models/users");

module.exports = function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("Nouveau client connecté", socket.id);

    socket.on("register", (userId) => {
      socket.userId = userId;
    });

    registerLobbyHandlers(io, socket);
    spawnPiece(io, socket);
    gameStart(io, socket);
    communicateMovingPieces(io,socket);
    updateScores(io, socket);
    endGame(io, socket);
    removeCompletedLines(io,socket)
  });
};
