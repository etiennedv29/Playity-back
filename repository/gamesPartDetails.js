const PartDetails = require('../models/gamesPartDetails');
const mongoose = require('mongoose')

const getPlayersStats = (arr) => {

    let playersStats = [];
    const properties = {
        string: "",
        number: 0,
        objectid: null
    }

    arr.forEach((e) => {
        let playerStat = {}
        if (e.options.includes("required") && e.propertyType.toLowerCase() === "objectid") {
            playerStat[e.property] = properties[e.propertyType.toLowerCase()];
            console.log('propriétés du joueur : ', playerStat);
        } else if (e.options.includes("required") && e.propertyType.toLowerCase() === "number") {
            playerStat[e.property] = properties[e.propertyType.toLowerCase()];
            console.log('propriétés du joueur : ', playerStat);
        } else if (e.options.includes("required") && e.propertyType.toLowerCase() === "string") {
            playerStat[e.property] = properties[e.propertyType.toLowerCase()];
            console.log('propriétés du joueur : ', playerStat);
        }
        playersStats.push(playerStat);
    })
    console.log('stats du joueur : ', playersStats);
    return playersStats;
}

/* Fonction qui vient récupérer les types de statitique pour un jeu donné :

        1. On lui donne l'Id du jeu en entrée
        2. Nous récupérons un objet avec pour propriété 
        chaque type de stat, ainsi que son initialisation en fonction du type indiqué
        3. On injectera ensuite cet objet dans la propriété gameStatistics

        Exemple de paramètre d'entrée : "245425d11452ds154cd"

        Exemple de sortie : 
        {
        propriété1: 0, (type number)
        propréiété2 : "", (type string)
        propriété3 : 0, (type number)
        }
*/

const getGamePartDetail = async (gameId) => {

    let gameProperties = {};
    const properties = {
        string: "",
        number: 0,
    }

    const all = await PartDetails.find({});
    console.log("📋 Tous les gamePartDetails :");
    all.forEach(doc => {
    console.log("gameId in DB:", doc.gameId.toString(), "Type:", typeof doc.gameId);
    });

    console.log("🎯 gameId recherché:", gameId.toString(), "Type:", typeof gameId);
    console.log("🔍 gameId ObjectId recherché:", new mongoose.Types.ObjectId(gameId).toString());

    console.log(gameId);
    const data = await PartDetails.findOne({gameId: new mongoose.Types.ObjectId(gameId)});
    console.log(data);

    // if (!data) {
    //     console.log('aucune stat de jeu trouvée')
    //     return
    // }

    const details = await data.details;
    const playersStats = getPlayersStats(data.playersStats);

    details.forEach((e) => {
        if (e.options.includes("required") && e.propertyType.toLowerCase() === "string") {
            gameProperties[e.property] = properties[e.propertyType.toLowerCase()];
        } else if (e.options.includes("required") && e.propertyType.toLowerCase() === "number") {
            gameProperties[e.property] = properties[e.propertyType.toLowerCase()];
        }
    });

    gameProperties.playersStats = playersStats;
    
    console.log(gameProperties);
    return gameProperties;
}

module.exports = { getGamePartDetail }