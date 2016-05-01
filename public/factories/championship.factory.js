(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.factory('ChampionshipFactory', ChampionshipFactory);

	ChampionshipFactory.$inject = ['$http', '$q'];
	function ChampionshipFactory($http, $q) {
		var factory = {
			championship: championship
		};

		return factory;

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