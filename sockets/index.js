const registerLobbyHandlers = require("./lobby");
const User = require("../models/users");

module.exports = function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("Nouveau client connecté", socket.id);

    socket.on("register", (userId) => {
      socket.userId = userId;
    });

    registerLobbyHandlers(io, socket);
  });
};
