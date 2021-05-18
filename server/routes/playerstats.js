let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let playerstatsController = require('../controllers/playerstats');

// helper function for guard purposes
function requireAuth(req, res, next)
{
  // check if user is logged in
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  next();
}

// get route for playerstats list --> read opreation

router.get('/', playerstatsController.displayPlayerStatsList);

// GET route for displaying ADD page --> CREATE opreation

router.get('/add', requireAuth, playerstatsController.displayAddPage);

// POST route for processing ADD page --> CREATE opreation

router.post('/add', requireAuth, playerstatsController.processAddPage);

// GET route for displaying EDIT page --> UPDATE opreation

router.get('/edit/:id', requireAuth, playerstatsController.displayEditPage);

// POST route for processing EDIT page --> UPDATE opreation

router.post('/edit/:id', requireAuth, playerstatsController.processEditPage);

// GET to perform player stats deletion --> DELETE opreation

router.get('/delete/:id', requireAuth, playerstatsController.performDelete);

module.exports = router;