(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('HakemboController', HakemboController);

	function HakemboController() {
		var vm = this;

		vm.appName = 'Hakembó';
	}

})();