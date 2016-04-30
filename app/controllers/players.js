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
* @param {Object} Object with information for response.
* @returns {Object} If occurs an error.
*/
function playersManagement(user, score, res) {
	var data = {
		user: user
	};
	
	Player.findOne(data, function(err, player) {
		if (err) {
			return res.send(500, 'gjg');
		}
	    else if (player === null) {
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
	playersManagement(req.body.first, 3, res);
	playersManagement(req.body.second, 1), res;

	res.status(200).jsonp({ status: 'success' });
};

/**
* .
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
*/
exports.championship = function(req, res) {
	
};

/**
* Return a list with the user of the players' list.
* @param {array} Array with players.
* @return {array} Array with the players' user.
*/
function manipulatePlayers(players) {
	var playerList = [];

	players.forEach(function(player, index) {
		playerList.push(player.user);
	});

	return playerList;
}

/**
* Return top n players with more score in the database, if count don't specified, the API assign count as 10.
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
* @return {array} Array with the players' user.
*/
exports.top = function(req, res) {
	var count = ( req.query.count === '' ? 10 : parseInt(req.query.count) ),
		score = { score: -1 };

	Player.find({}, {user: ''}).sort(score).limit(count).exec(function(err, players) {
	    if (err) {
	    	return res.send(500, err.message);
	    }

		res.status(200).jsonp({ players: manipulatePlayers(players) });
	});
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

		res.status(200).jsonp(players);
	});
};

/**
* Delete all players in the database.
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
* @return {Object} Object with response of the remove.
*/
exports.resetDatabase = function(req, res) {
	Player.remove(function(err, response) {
	    if(err) {
	    	res.send(500, err.message);
	    }

		res.status(200).jsonp({ status: 'success' });
	});
};