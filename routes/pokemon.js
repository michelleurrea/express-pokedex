var router = require('express').Router();
var db = require('../models');
var request = require('request');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  	db.pokemon.findAll()
  	.then(favorites => {
  		res.render('pokemons/show', { pokemon: favorites })
  	})
  	.catch(err => {
		console.log('error', err)
		res.send('error')
	})
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res,) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .spread(function(poke, wasCreated){
    res.redirect('pokemon');
  })
  .catch((err) => {
    console.log('ERROR HAPPENED', err)
    res.render('error')
  })
});

router.get('/:name', (req, res) => {
  var pokeName = req.params.name;
  var pokeUrl = 'http://pokeapi.co/api/v2/pokemon/' + pokeName
  console.log(pokeUrl);
  request(pokeUrl, function(error, response, body){
    if(error || response.statusCode != 200){
      res.render('error');
    }
    else {
      var pokeInfo = JSON.parse(body);
      res.render('pokemons/favorite', { pokeInfo: pokeInfo })
    }
  });
})

module.exports = router;
