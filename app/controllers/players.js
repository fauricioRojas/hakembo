var mongoose = require('mongoose');
var Player = mongoose.model('Player');

/**
* Insert a new player in the database.
* @param {string} Player's username.
* @param {integer} Score's username.
*/
function addPlayer(user, score) {
	var player = new Player({
		user: user,
		score: score,
	});

	player.save();
};

/**
* Validate if a player exists or no, if exists adds the player else increase the user's score.
* @param {string} Player's username.
* @param {integer} Score's username.
*/
function playersManagement(user, score) {
	var data = {
		user: user
	};
	
	Player.findOne(data, function(err, player) {
	    if (player === null) {
	    	addPlayer(user, score);
	    	return;
	    }

	    player.score = player.score + score;
	    player.save();
	});
}

/**
* Send both players that played the final to increase your score, 3 points for champion and 1 point for sub champion.
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
*/
exports.result = function(req, res) {
	playersManagement(req.body.first, 3);
	playersManagement(req.body.second, 1);

	res.status(200).jsonp({status: 'success'});
};

/**
* .
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
*/
exports.championship = function(req, res) {
	
};

/**
* Return n players with more score in the database.
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
* @return {array} Players.
*/
exports.findPlayers = function(req, res) {
	console.log(req.body.count);
	//var count = ( req.body.count === '' ? 10 : req.body.count );
	//console.log(count);

	/*Player.findById(count, function(err, players) {
	    if (err) {
	    	return res.send(500, err.message);
	    }

    	console.log('GET /players/' + req.params.id);
		res.status(200).jsonp(players);
	});*/
};

/**
* Return all players in the database.
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
* @return {array} Players.
*/
exports.findAll = function(req, res) {
	Player.find(function(err, players) {
	    if(err) {
	    	res.send(500, err.message);
	    }

    	console.log('GET /players');
		res.status(200).jsonp(players);
	});
};