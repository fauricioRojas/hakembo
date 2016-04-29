(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('HakemboController', HakemboController);

	HakemboController.$inject = ['$http', 'HakemboFactory'];
	function HakemboController($http, HakemboFactory) {
		var vm = this;

		vm.appName = 'Hakembó';

		HakemboFactory.result('fauri', 'marvin')
		.then(function(response) {
			console.log(response);
		});
	}

})();