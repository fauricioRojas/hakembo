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

exports.validateStrategy = function(strategy, res) {
	if (strategy !== 'R' && strategy !== 'P' && strategy !== 'S') {
		console.log('Diferent strategy');
		return res.send(500, { status: 'invalid strategy' });
	}
}

/*exports.duel = function(arrayPlayers, res) {
	var i = 0,
		length = arrayPlayers.length;

	for ( ; i < length; i++) {
		exports.validateStrategy(arrayPlayers[i][1], res);
	}

	return exports.whoWin(arrayPlayers[0], arrayPlayers[1]);
}*/

exports.firstIsWinner = function(strategy1, strategy2) {
	if ( (strategy1 === 'P' && strategy2 === 'R') || 
		 (strategy1 === 'R' && strategy2 === 'S') || 
		 (strategy1 === 'S' && strategy2 === 'P') ) {
		return true;
	}

	return false;
}

exports.whoWin = function(player1, player2, res) {	
	exports.validateStrategy(player1[1], res);
	exports.validateStrategy(player2[1], res);

	if (player1[1] !== player2[1]) {
		// Player 1 is the winner
		if (exports.firstIsWinner(player1[1], player2[1])) {
			return player1;
		}
		// Player 2 is the winner
		else if (exports.firstIsWinner(player2[1], player1[1])) {
			return player2;
		}
	}
	else {
		return player1;
	}
}

exports.championship = function(tournament) {
  	if (typeof(tournament[0][1]) === 'string') {
    	return exports.whoWin(tournament[0],tournament[1]);
    }
  	else {
    	a1 = exports.championship(tournament[0]);
    	a2 = exports.championship(tournament[1]);
    	
    	return exports.championship([a1,a2]);
    }
}


/**
* Validate.
* @param {Object} Contain information that receive from the web app.
* @param {Object} Object with information for response.
*/
exports.new = function(req, res) {
	var data = JSON.parse(req.body.data),
		granFinal = [];
	
	for (var i=0; i<data.length; i++) {
		granFinal[i] = exports.championship(data[i]);
	}

	console.log(granFinal);
	console.log(exports.whoWin(granFinal[0], granFinal[1]));
	
	
	res.status(200).jsonp({ status: 'success' });
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