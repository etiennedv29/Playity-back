const mongoose = require("mongoose");

const gamesSchema = mongoose.Schema({
  name: {
    type: string,
    required: true,
  },
  description: {
    type: string,
    required: true,
  },
  image: {
    type: string,
    required: true,
  },
  isPremium: {
    type: boolean,
    required: true,
  },
  parts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  // gamePartDetails: {
  //   type: boolean,
  //   required: true,
  // },
  tutorial: {
    type: [],
    required: true,
  },
  demo: {
    type: [],
    required: true,
  },
  maxPlayers: {
    type: number,
    required: true,
  },
  tags: {
    type: [string],
    required: true,
  },
});

const gamesModel = mongoose.model("games", gamesSchema);

module.exports = gamesModel;
