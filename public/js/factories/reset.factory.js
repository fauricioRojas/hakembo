(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.factory('ResetFactory', ResetFactory);

	// Inject dependencies.
	ResetFactory.$inject = ['$http', '$q'];

	/**
	* Reset factory.
	* @param {Object} Service that allows to realize requests to server.
	* @param {Object} Service that helps to execute functions asynchronously.
	* @returns {Object} Object with the factory's methods.
	*/
	function ResetFactory($http, $q) {
		var factory = {
			resetDatabase: resetDatabase
		};

		return factory;

		/**
		* Reset the database using the the RESTfulAPI.
		* @returns {Object} Result of reset the database.
		*/
		function resetDatabase() {
			var defered = $q.defer();

			$http({
				method: 'DELETE',
				url: 'api/championship/reset'
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}
	}

})();