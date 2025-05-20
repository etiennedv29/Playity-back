const mongoose = require("mongoose");

const lobbiesSchema = mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  players: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
  },
  nbPlayers: {
    type: number,
    required: true,
  },
  parts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "parts",
  },
});

const lobbiesModel = mongoose.model("lobbies", lobbiesSchema);

module.exports = lobbiesModel;
