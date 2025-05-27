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

const games = new Map();

function spawnPiece(io, socket) {
  socket.on("spawn_piece", ({ currentPlayerIndex, code }) => {
    // console.log({ currentPlayerIndex }, { code });

    //générer random la pièce qui va tomber
    let piecesType = Object.keys(TETROMINOES);
    let randomPieceIndex = Math.floor(Math.random() * piecesType.length);
    let randomPieceShape = TETROMINOES[piecesType[randomPieceIndex]];

    //colonne de la case en haut à gauche de la pièce qui va tomber (en récupérant la largeur de la pièce : randomPieceShape[0])
    let newPieceStartCol = Math.floor(
      currentPlayerIndex * COLS_PER_PLAYER +
        (COLS_PER_PLAYER - randomPieceShape[0].length) / 2
    );

    //pièce à envoyer à tout le monde
    let spawnedPiece = {
      playerIndex: currentPlayerIndex,
      newShape: randomPieceShape,
      newRow: 0,
      newCol: newPieceStartCol,
    };
    let oldPiece={oldShape:[], oldRow:"", oldCol:""}

    // console.log({ currentPlayerIndex, spawnedPiece });

    //envoi à tout le monde dans le lobby

    io.to(code).emit("receive_piece", [oldPiece,spawnedPiece]);
  });
}

function gameStart(io, socket) {
  socket.on("gameStart", ({ code, startedBy }) => {
    let gameStarted = { gameStartInfo: true, startedBy };
    io.to(code).emit("gameStartedNow", gameStarted);
  });
}

module.exports = { gameStart, spawnPiece };

function communicateMovingPieces(io, socket) {
  socket.on(
    "move_piece",
    ([
      { oldShape, oldRow, oldCol },
      { playerIndex, newShape, newRow, newCol, code },
    ]) => {
      console.log("old Piece Received in back ", {
        oldShape,
        oldRow,
        oldCol,
      });
      console.log("new Piece received in back", {
        playerIndex,
        newShape,
        newRow,
        newCol,
        code,
      });
      let oldPiece = { oldShape, oldRow, oldCol };
      let newPiece = { playerIndex, newShape, newRow, newCol };
      socket.to(code).emit("receive_piece", [oldPiece,newPiece]);
    }
  );
}

function updateScores(io, socket) {

  socket.on("part_scores", ({ code, playerId, completedLines, piecesPlaced }) => {

  // Si aucun tableau de scores n'est associé à ce code, on le créée
  if (!games.has(code)) {
    games.set(code, {
      playersStats: [],
      numberOfPieces: 0,
      completedLines: 0,
      teamScore: 0
    });
  }

  const gamePartDetails = games.get(code);
  
  const scoreTab = { 1: 100, 2: 300, 3: 500, 4: 800 };
  let playerPoints = scoreTab[completedLines] || 0;

  // On vérifie si le joueur existe déjà dans les gamePartDetails
  let currentPlayer = gamePartDetails.playersStats.find((e) => e.player === playerId);

  if (!currentPlayer) {
    currentPlayer = {
      player: playerId,
      completedLines: 0,
      score: 0
    };
    gamePartDetails.playersStats.push(currentPlayer);
  }

  // On met à jour les stats de la partie et du joueur
  currentPlayer.completedLines += completedLines;
  currentPlayer.score += playerPoints;
  gamePartDetails.completedLines += completedLines;
  gamePartDetails.numberOfPieces += piecesPlaced;

  // On renvoie le tout dans l'événement part_scores
  io.to(code).emit("part_scores", gamePartDetails);

  });

}

module.exports = { gameStart, spawnPiece, communicateMovingPieces, updateScores };
