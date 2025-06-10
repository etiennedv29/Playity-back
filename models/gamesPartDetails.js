const mongoose = require("mongoose");

const GPDSchema = new mongoose.Schema({
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "games" },
    details: [{
        property: String, // "completedLines", "teamScore"...  
        propertyType: String, // "Number", "Boolean", "Subdoc"...
        options: [String] // "required", "midleware"... ? 
    }],
    playersStats: [{
    property: String, // "completedLines", "teamScore"...  
    propertyType: String, // "Number", "Boolean", "Subdoc", ObjectId...
    options: [String] // "required", "midleware"... ? 
    }]
})

const gamePartDetailsModel = mongoose.models.gamePartDetails || mongoose.model("gamespartdetails", GPDSchema)

module.exports = gamePartDetailsModel;

// Exemple de détails de partie pour 1 jeu

// const test = {
//     gameId: "6565dfd6546sq15q4",
//     details: [
//         {
//         property: "completedLines", // "completedLines", "teamScore"...  
//         propertyType: "number", // "Number", "Boolean", "Subdoc"...
//         options: ["required"] // "required", "midleware"... ? 
//         },
//         {
//         property: "teamScore", // "completedLines", "teamScore"...  
//         propertyType: "number", // "Number", "Boolean", "Subdoc"...
//         options: ["required"] // "required", "midleware"... ? 
//         }
//     ],
//     playersStats: [
//         {
//         property: "player", // "completedLines", "teamScore"...  
//         propertyType: "objectid", // "Number", "Boolean", "Subdoc"...
//         options: ["required"] // "required", "midleware"... ? 
//         },
//         {
//         property: "score", // "completedLines", "teamScore"...  
//         propertyType: "number", // "Number", "Boolean", "Subdoc"...
//         options: ["required"] // "required", "midleware"... ? 
//         }
//     ],
// }
