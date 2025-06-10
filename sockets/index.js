const registerLobbyHandlers = require("./lobby");
const {
  spawnPiece,
  gameStart,
  communicateMovingPieces,
  updateScores,
  endGame,
  removeCompletedLines,
  fixingPieces,
  checkCompletedLine,
} = require("./multitris");

const User = require("../models/users");

module.exports = function registerSocketHandlers(io) {
  io.on("connection", (socket) => {

    socket.on("register", (userId) => {
      socket.userId = userId;
    });

    registerLobbyHandlers(io, socket);
    spawnPiece(io, socket);
    gameStart(io, socket);
    communicateMovingPieces(io, socket);
    updateScores(io, socket);
    endGame(io, socket);
    removeCompletedLines(io, socket);
    fixingPieces(io, socket);
    checkCompletedLine(io, socket);
  });
};
