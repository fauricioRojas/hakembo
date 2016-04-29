(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.factory('HakemboFactory', HakemboFactory);

	HakemboFactory.$inject = ['$http', '$q'];
	function HakemboFactory($http, $q) {
		var factory = {
			result: result
		};

		return factory;

		function result(first, second) {
			var defered = $q.defer(),
				data = {
					first: first,
					second: second
				};

			$http({
				url: '/api/championship/result',
				method: 'POST',
				data: data
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