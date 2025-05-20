const mongoose = require("mongoose");

const partsSchema = mongoose.Schema({
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

const partsModel = mongoose.model("parts", partsSchema);

module.exports = partsModel;
