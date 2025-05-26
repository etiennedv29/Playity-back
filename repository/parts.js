const Part = require('../models/parts');

const createPart = async (part) => {
    const newPart = await new Part(part);
    return newPart.save();
}

// Assigner à chaque playerStat de la partie l'Id d'un joueur du lobby
const setPlayersIds = async (partId, arr) => {
    const part = await PartDetails.findById({_id: partId})    
    
    for (let i = 0; i < arr.length; i++) {
        part.playersStats[i].player = arr[i];
    }
}

module.exports = { createPart, setPlayersIds }