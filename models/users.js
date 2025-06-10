const mongoose = require("mongoose");
const { Types } = require("mongoose");

const premiumDataSchema = new mongoose.Schema({
  submissionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  facture: { type: String, required: true },
});

// Créé en anticipation post-projet
// const preferencesSchema = new mongoose.Schema({
//   newsletterSubmission: { type: Boolean, required: true, default: false },
// });

// Créé en anticipation post-projet
// const achievementsSchema = new mongoose.Schema({
//   oneGame: { type: Boolean, default: false },
//   fiveGames: { type: Boolean, default: false },
//   hundredGames: { type: Boolean, default: false },
//   oneFriend: { type: Boolean, default: false },
//   fiveFriends: { type: Boolean, default: false },
// });

const usersSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  dateOfBirth: { type: Date },
  password: {
    type: String,
  },
  connectionWithSocials: {
    type: Boolean,
  },
  token: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: ["guest"],
  },
  partsPlayed: { type: [Types.ObjectId], ref: "parts", default: [] },
  friends: { type: [Types.ObjectId], ref: "users", default: [] },
  premiumData: premiumDataSchema,
});

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
