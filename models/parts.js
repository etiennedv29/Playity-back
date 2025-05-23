const mongoose = require("mongoose");
const { Types } = require("mongoose");

const partsSchema = mongoose.Schema({
  game: 
    { type: [Types.ObjectId], ref: "games", default: [] }
  ,
  lobby: { type: [Types.ObjectId], ref: "lobbies", default: [] },,
  status: {
    type: string,
    required: true,
  },
  partStatistics: {
    type:[]
  },
});

const partsModel = mongoose.model("parts", partsSchema);

module.exports = partsModel;
