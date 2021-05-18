let mongoose = require('mongoose');

// create model class

let playerstatsModel = mongoose.Schema ({
    name: String,
    season: String,
    team: String,
    pos: String,
    gp: String,
    goals: String,
    assists: String,
    points: String,
},
{
    collection: "playerstats"
})
module.exports = mongoose.model('playerstats', playerstatsModel);