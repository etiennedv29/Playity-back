const registerLobbyHandlers = require("./lobby");

module.exports = function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("Nouveau client connecté", socket.id);

    registerLobbyHandlers(io, socket);
  });
};
