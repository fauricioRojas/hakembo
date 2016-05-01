(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.factory('ResetFactory', ResetFactory);

	ResetFactory.$inject = ['$http', '$q'];
	function ResetFactory($http, $q) {
		var factory = {
			resetDatabase: resetDatabase
		};

		return factory;

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