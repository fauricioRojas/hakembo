var mongoose = require('mongoose');
var Player = mongoose.model('Player');

//POST - Return the winner of a match or championship.
exports.result = function(req, res) {
	
};

//POST - Resolve the championship.
exports.championship = function(req, res) {
	
};

//GET - Return n Players with more score in the database.
exports.findPlayers = function(req, res) {
	var count = req.params.count;

	Player.findById(count, function(err, players) {
	    if (err) {
	    	return res.send(500, err.message);
	    }

    	console.log('GET /players/' + req.params.id);
		res.status(200).jsonp(players);
	});
};


//POST - Insert a new Player in the database.
exports.addPlayer = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var player = new Player({
		user: req.body.user,
		score: req.body.score,
	});

	player.save(function(err, player) {
		if (err) {
			return res.send(500, err.message);
		}
    	
    	res.status(200).jsonp(player);
	});
};

//GET - Return all players in the database.
exports.findAll = function(req, res) {
	Player.find(function(err, players) {
	    if(err) {
	    	res.send(500, err.message);
	    }

    	console.log('GET /players')
		res.status(200).jsonp(players);
	});
};