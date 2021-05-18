let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to playerstats model
let PlayerStats = require('../models/playerstats');

module.exports.displayPlayerStatsList = (req, res, next) => {
  PlayerStats.find((err, playerstatsList) => {

    if (err)

    {
        
      return console.error(err);

    } else {

      //console.log(playerstatsList);
      res.render('playerstats/list', 
      {title : 'Player Stats List', 
      playerstatsList : playerstatsList, 
      displayName: req.user ? req.user.displayName : ''})

    }

  });

}

module.exports.displayAddPage = (req, res, next) => {
  res.render('playerstats/add', 
  {title: 'Add Player Stats', 
  displayName: req.user ? req.user.displayName : ''})
}

module.exports.processAddPage = (req, res, next) => {
  let newPlayerStats = PlayerStats({
    "name": req.body.name,
    "season": req.body.season,
    "team": req.body.team,
    "pos": req.body.pos,
    "gp": req.body.gp,
    "goals": req.body.goals,
    "assists": req.body.assists,
    "points": req.body.points
  });

  PlayerStats.create(newPlayerStats, (err, PlayerStats) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      // refresh the player stats list
      res.redirect('/playerstats-list');
    }
  });

}

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  PlayerStats.findById(id, (err, playerstatsToEdit) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    } 
    else
    {
      //show the edit view      
      res.render('playerstats/edit', 
      {title: 'Edit Player Stats', 
      playerstats: playerstatsToEdit,
      displayName: req.user ? req.user.displayName : ''})
    
    }
  });
}

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id
  
  let updatedPlayerStats = PlayerStats({
    "_id": id,
    "name": req.body.name,
    "season": req.body.season,
    "team": req.body.team,
    "pos": req.body.pos,
    "gp": req.body.gp,
    "goals": req.body.goals,
    "assists": req.body.assists,
    "points": req.body.points
  });

  PlayerStats.updateOne({_id: id}, updatedPlayerStats, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      // refresh player stats list
      res.redirect('/playerstats-list');
    }
  });
}

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  PlayerStats.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
           // refresh the Client list
           res.redirect('/playerstats-list');
      }
  });
}