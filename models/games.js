const mongoose = require("mongoose");

const gamesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
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
    type: String,
    required: true,
  },
  maxPlayers: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

const gamesModel = mongoose.model("games", gamesSchema);

module.exports = gamesModel;
