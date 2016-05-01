(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('TopController', TopController);

	TopController.$inject = ['$http', 'TopFactory'];
	function TopController($http, TopController) {
		var vm = this;
		vm.title = 'Top 10';
		vm.count = '';

		vm.getTopPlayers = getTopPlayers;

		function getTopPlayers() {
			vm.title = (vm.count !== '' ? 'Top ' + vm.count : 'Top 10');
			TopController.getTopPlayers(vm.count)
			.then(function(response) {
				vm.players = response;
			})
		}

		getTopPlayers();
	}
})();