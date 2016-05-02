(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.factory('TopFactory', TopFactory);

	// Inject dependencies.
	TopFactory.$inject = ['$http', '$q'];

	/**
	* Top factory.
	* @param {Object} Service that allows to realize requests to server.
	* @param {Object} Service that helps to execute functions asynchronously.
	* @returns {Object} Object with the factory's methods.
	*/
	function TopFactory($http, $q) {
		var factory = {
			getTopPlayers: getTopPlayers
		};

		return factory;

		/**
		* Send a number of players to the RESTfulAPI for get the classification of top players.
		* @param {integer} Number of players for get.
		* @returns {Object} Player's array based on the count.
		*/
		function getTopPlayers(count) {
			var defered = $q.defer();

			$http({
				method: 'GET',
				url: 'api/championship/top?count=' + count
			})
			.success(function(response) {
				defered.resolve(response.players);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}
	}
})();