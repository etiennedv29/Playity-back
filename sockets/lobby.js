const {
  getLobbyByCode,
  removePlayerToLobby,
  addPlayerToLobby,
} = require("../repository/lobbies");

module.exports = function register(io, socket) {
  socket.on("joinLobby", async ({ code, userId }, callback) => {
    const lobby = await getLobbyByCode(code);
    if (
      lobby &&
      lobby["players"] &&
      lobby.players.length + 2 > lobby.nbPlayers &&
      userId !== lobby.admin
    ) {
      return callback({ success: false, error: "Lobby is full" });
    }

    const lobbyToReturn = await addPlayerToLobby(code, userId);

    socket.join(code);

    socket.to(code).emit("userJoined", { lobby: lobbyToReturn });

    if (lobby) {
      return callback({ success: true, lobby: lobbyToReturn });
    }

    return callback({ success: false });
  });

  socket.on("leaveLobby", async ({ code, userId }, callback) => {
    const lobby = await removePlayerToLobby(code, userId);

    socket.to(code).emit("userLeft", { lobby });

    return callback({ success: true });
  });

  // Déconnexion
  socket.on("disconnect", () => {
    console.log("Client déconnecté", socket.id);
  });
};
