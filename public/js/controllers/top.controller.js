(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('TopController', TopController);

	// Inject dependencies.
	TopController.$inject = ['$scope', 'TopFactory'];
	
	/**
	* Top controller.
	* @param {Object} Service that provides functions to help controller's functionality.
	*/
	function TopController($scope, TopFactory) {
		var vm = this;
		vm.title = 'Top 10';
		vm.count = '';
		vm.getTopPlayers = getTopPlayers;

		getTopPlayers();
		
		/**
		* Get the n top players.
		*/
		function getTopPlayers() {
			vm.title = (vm.count !== '' ? 'Top ' + vm.count : 'Top 10');

			TopFactory.getTopPlayers(vm.count)
			.then(function(response) {
				vm.players = response;
			});
		}
	}
})();