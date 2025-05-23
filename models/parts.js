const mongoose = require("mongoose");

const partsSchema = mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "games",
    required: true,
  },
  lobby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lobbies",
    required: true,
  },
  status: {
    type: [String],
    default: [],
  },

  gamePartDetails: { type: mongoose.Schema.Types.Mixed },
});

// const parts = {
//   game: "fheofhozeh",
//   lobby: "hfohfoezhf",
//   status: "ongoing",
//   partStatistics: {
//     completedLines: 0,
//     teamScore: null
//   }
// }

const partsModel = mongoose.model("parts", partsSchema);

module.exports = partsModel;
