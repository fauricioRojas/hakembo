(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.factory('ChampionshipFactory', ChampionshipFactory);

	ChampionshipFactory.$inject = ['$http', '$q'];
	function ChampionshipFactory($http, $q) {
		var factory = {
			
		};

		return factory;
	}

})();