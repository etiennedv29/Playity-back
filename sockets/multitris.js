const COLS_PER_PLAYER = 10;
const TETROMINOES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
};

function spawnPiece(io, socket) {
  socket.on("spawn_piece", ({ currentPlayerIndex, code }) => {
    // console.log({ currentPlayerIndex }, { code });

    //générer random la pièce qui va tomber
    let piecesType = Object.keys(TETROMINOES);
    let randomPieceIndex = Math.floor(Math.random() * piecesType.length);
    let randomPiece = TETROMINOES[piecesType[randomPieceIndex]];

    //colonne de la case en haut à gauche de la pièce qui va tomber (en récupérant la largeur de la pièce : randomPiece[0])
    let newPieceStartCol = Math.floor(
      currentPlayerIndex * COLS_PER_PLAYER +
        (COLS_PER_PLAYER - randomPiece[0].length) / 2
    );

    //pièce à envoyer à tout le monde
    let spawnedPiece = {
      playerIndex: currentPlayerIndex,
      receivedPiece: randomPiece,
      pieceRow: 0,
      pieceCol: newPieceStartCol,
    };

    console.log({ currentPlayerIndex, spawnedPiece });

    //envoi à tout le monde dans le lobby

    io.to(code).emit("receive_piece", spawnedPiece);
  });
}

function gameStart(io, socket) {
  socket.on("gameStart", ({ code, startedBy }) => {
    let gameStarted = { gameStartInfo: true, startedBy };
    io.to(code).emit("gameStartedNow", gameStarted);
  });
}

function currentGameScores(io, socket) {
  socket.on("playerScore", ({code, score, player}) => {
  let newScore = {
    score: score,
    player: player,
  }
  io.to(code).emit("gameScores", newScore)
  })
}

module.exports = { gameStart, spawnPiece, currentGameScores };
