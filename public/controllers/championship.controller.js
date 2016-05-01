(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('ChampionshipController', ChampionshipController);

	ChampionshipController.$inject = ['$http', 'ChampionshipFactory'];
	function ChampionshipController($http, ChampionshipFactory) {
		var vm = this;
		vm.uploadFile = uploadFile;

		function uploadFile() {
			console.log(document.getElementById("file").value);

			/*$http.get(document.getElementById("file").value)
			.success(function(response) {
				console.log(response);
			})
			.error(function(err) {
				console.log(err);
			});*/
			
		}
	}
})();