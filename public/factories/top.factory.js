(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.factory('TopFactory', TopFactory);

	TopFactory.$inject = ['$http', '$q'];
	function TopFactory($http, $q) {
		var factory = {
			getTopPlayers: getTopPlayers
		};

		return factory;

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