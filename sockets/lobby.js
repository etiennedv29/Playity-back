const {
  getLobbyByCode,
  removePlayerToLobby,
  addPlayerToLobby,
} = require("../repository/lobbies");

const isAdminConnectedToLobby = (lobby) => {
  return lobby.players.some((player) => player["_id"] === lobby.admin);
};

const isAdmin = (lobby, idAdmin) => lobby.admin === idAdmin;

const getNbSpotLeft = (lobby, userId) => {
  let nbPlayersConnected = lobby.players.length;
  if (!isAdminConnectedToLobby(lobby) && !isAdmin(userId)) {
    nbPlayersConnected -= 1;
  }

  return lobby.nbPlayers - nbPlayersConnected;
};

module.exports = function register(io, socket) {

  socket.on("joinLobby", async ({ code, userId }, callback) => {
    const lobby = await getLobbyByCode(code);

    if (!lobby || getNbSpotLeft(lobby, userId) <= 0) {
      return callback({ success: false, error: "Lobby doesn't exist" });
    }

    const lobbyToReturn = await addPlayerToLobby(code, userId);

    socket.join(code);
    socket.currentRoom = code;

    io.to(code).emit("userJoined", { lobby: lobbyToReturn });

    if (lobby) {
      return callback({ success: true, lobby: lobbyToReturn });
    }

    return callback({ success: false });
  });

  socket.on("leaveLobby", async ({ code, userId }) => {
    const lobby = await removePlayerToLobby(code, userId);

    io.to(code).emit("userLeft", { lobby });
  });

  // Déconnexion
  socket.on("disconnect", async () => {
    const lobby = await removePlayerToLobby(socket.currentRoom, socket.userId);

    io.to(socket.currentRoom).emit("userLeft", { lobby });
  });
};
