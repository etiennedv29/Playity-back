const PartDetails = require('../models/gamesPartDetails');
const mongoose = require('mongoose');

const getPlayerStats = (e) => {

    console.log('élément transmis à getPlayerStats : ', e);
    const playerStat = {}
    const properties = {
        string: "",
        number: 0,
        objectid: null
    }

    if (e.options.includes("required") && e.propertyType.toLowerCase() === "objectid") {
        playerStat[e.property] = properties[e.propertyType.toLowerCase()];
        console.log('type objet trouvé');
    } else if (e.options.includes("required") && e.propertyType.toLowerCase() === "number") {
        playerStat[e.property] = properties[e.propertyType.toLowerCase()];
        console.log('type number trouvé');
    } else if (e.options.includes("required") && e.propertyType.toLowerCase() === "string") {
        playerStat[e.property] = properties[e.propertyType.toLowerCase()];
        console.log('type string trouvé');
    }

    return playerStat;
}

//         3. On injectera ensuite cet objet dans la propriété gameStatistics

//         Exemple de paramètre d'entrée : "245425d11452ds154cd"

//         Exemple de sortie : 
//         {
//         propriété1: 0, (type number)
//         propréiété2 : "", (type string)
//         propriété3 : 0, (type number)
//         }
// 

// Fonction qui vient récupérer les types de statitique pour un jeu donné :
//   1. On lui donne l'Id du jeu en entrée
const getGamePartDetail = async (gameId, players) => {

//   2. On initialise un objet de correspondance des propriétés
    let gameProperties = {};

    const properties = {
        string: "",
        number: 0,
    }

    console.log('Id de la game : ', gameId);
    const data = await PartDetails.findOne({gameId: new mongoose.Types.ObjectId(gameId)});
    console.log(data);

    // Si l'id de la game n'est pas trouvé, on le signale dans la console
    if (!data) {
        console.log('aucune stat de jeu trouvée')
        return
    }

    const details = await data.details;
    const allPlayersStats = [];
    let playerStats = {};

    for (let i = 0; i < players.length; i++) {
        console.log(`On traite le player ${i}`)
        
        data.playersStats.forEach((e) => {
            
            playerStats = {...playerStats, ...getPlayerStats(e)}
        })
        playerStats.player = players[i];

        console.log(`Objet stats du player ${i} : ${{...playerStats}}`)
        allPlayersStats.push(playerStats);
    }

    details.forEach((e) => {
        if (e.options.includes("required") && e.propertyType.toLowerCase() === "string") {
            gameProperties[e.property] = properties[e.propertyType.toLowerCase()];
        } else if (e.options.includes("required") && e.propertyType.toLowerCase() === "number") {
            gameProperties[e.property] = properties[e.propertyType.toLowerCase()];
        }
    });

    
    gameProperties.playersStats = allPlayersStats;
    
    return gameProperties;
}

module.exports = { getGamePartDetail }