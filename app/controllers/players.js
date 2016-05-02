// Require libraries for the controller function successfully.
var mongoose = require('mongoose');
// Import the Player model.
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
* Validate if a player exists or no, if exists add the player else increase the user's score.
* @param {string} Player's username.
* @param {integer} Score's username.
* @param {Object} Object with information for response.
* @returns {Object} If occurs an error.
*/
exports.playersManagement = function(user, score, res) {
	var data = {
		user: user
	};
	
	Player.findOne(data, function(err, player) {
		if (err) {
			return res.send(500, err.message);
		}
	    else if (player === null) {
	    	addPlayer(user, score);
	    	return;
	    }

	    player.score += score;
	    player.save(function(err) {
			if(err) {
				return res.send(500, err.message);
			}
		});
	});
}

/**
* Send both players that played the final to increase your score, 3 points for champion and 1 point for sub champion.
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
*/
exports.result = function(req, res) {
	exports.playersManagement(req.body.first, 3, res);
	exports.playersManagement(req.body.second, 1, res);

	res.status(200).jsonp({ status: 'success' });
};

/**
* Validate a duel must have exactly 2 players. If the array's length is different of 2, raise an exception.
* @param {Array} Players array.
*/
exports.validateLength = function(players) {
	try {
		console.log(typeof(players[0][0]) === 'string', typeof(players[0][1]) === 'string', typeof(players[1][0]) === 'string', typeof(players[1][1]) === 'string');
		if (typeof(players[0][0]) === 'string' && typeof(players[0][1]) === 'string' 
			&& typeof(players[1][0]) === 'string' && typeof(players[1][1]) === 'string') {

		}
		else {
			throw 'The duel format in invalid, the user and strategy should be strings.';	
		}
	} catch (err) {
		throw 'The duel format is invalid, must have exactly 2 players.';
	}
}

/**
* Validate that a strategy is "R", "P" or "S". If the strategy is different of those strategies, raise an exception.
* @param {string} Strategy.
*/
exports.validateStrategy = function(strategy) {
	if (strategy !== 'R' && strategy !== 'P' && strategy !== 'S') {
		throw 'The player strategy only can be R, P or S.';
	}
}

/**
* Determine if strategy1 wins to strategy2.
* @param {bool} True if strategy1 won, else false.
*/
exports.firstIsWinner = function(strategy1, strategy2) {
	if ( (strategy1 === 'P' && strategy2 === 'R') || 
		 (strategy1 === 'R' && strategy2 === 'S') || 
		 (strategy1 === 'S' && strategy2 === 'P') ) {
		return true;
	}

	return false;
}

/**
* Principal method for determinate who is the winner. Call validateStrategy and firstIsWinner method.
* @param {Array} Array with the winner and subchampion.
*/
exports.whoWin = function(player1, player2) {
	// Transform the strategy to uppercase.
	player1[1] = player1[1].toUpperCase();
	player2[1] = player2[1].toUpperCase();

	// Validate if strategy is valid.
	exports.validateStrategy(player1[1]);
	exports.validateStrategy(player2[1]);

	if (player1[1] !== player2[1]) {
		// Player 1 is the winner.
		if (exports.firstIsWinner(player1[1], player2[1])) {
			return [player1, player2];
		}
		// Player 2 is the winner.
		else if (exports.firstIsWinner(player2[1], player1[1])) {
			return [player2, player1];
		}
	}
	
	// Player 1 is the winner.
	return [player1, player2];
}

/**
* Travel throughout the players' array recursively and get the winner of each duel. From each winner create new duels and so on until the tournament ends.
* @param {Array} Array with championship's players.
* @param {Object} Object with information for response.
* @returns {Array} Array with the first and second place of the championship.
*/
exports.championship = function(tournament) {
	var key1,
		key2;

  	if (typeof(tournament[0][1]) === 'string') {
  		exports.validateLength(tournament);

    	return exports.whoWin(tournament[0],tournament[1])[0];
    }
  	else {
    	key1 = exports.championship(tournament[0]);
    	key2 = exports.championship(tournament[1]);
    	
    	return exports.championship([key1, key2]);
    }
}

/**
* Get the tournament from the front-end and pass it to the championship method. Save in the database the winner with 3 points and subchampion with 1 point.
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
*/
exports.new = function(req, res) {
	try {
		var data = JSON.parse(req.body.data),
			finalists = [],
			i = 0,
			length = data.length;
	} catch (err) {
		throw 'The structure is invalid.';
	}
	
	if (typeof(data[0][1]) === 'string') {
    	exports.validateLength(data);
    	finalists = data;
    }
    else {
		for ( ; i < length; i++) {
			finalists.push(exports.championship(data[i]));
		}
	}

	finalists = exports.whoWin(finalists[0], finalists[1], res);

	exports.playersManagement(finalists[0][0], 3, res);
	exports.playersManagement(finalists[1][0], 1, res);
	
	res.status(200).jsonp({ winner: finalists[0] });
};

/**
* Return a list with the user of each player starting a players list.
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