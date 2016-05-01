(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.factory('ChampionshipFactory', ChampionshipFactory);

	// Inject dependencies.
	ChampionshipFactory.$inject = ['$http', '$q'];

	/**
	* Championship factory.
	* @param {Object} Service that allows to realize requests to server.
	* @param {Object} Service that helps to execute functions asynchronously.
	* @returns {Object} Object with the factory's methods.
	*/
	function ChampionshipFactory($http, $q) {
		var factory = {
			championship: championship
		};

		return factory;

		/**
		* Send to the RESTfulAPI the championship for determine the winner.
		* @param {string} Content of championship's structure.
		* @returns {Object} Result of the championship.
		*/
		function championship(content) {
			var defered = $q.defer(),
				data = {
					data: content
				};

			$http({
				method: 'POST',
				url: 'api/championship/new',
				data: data
			})
			.success(function(response) {
				defered.resolve(response.winner);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}
	}

})();