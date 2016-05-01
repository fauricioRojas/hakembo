(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('HakemboController', HakemboController);

	HakemboController.$inject = ['$http', 'HakemboFactory'];
	function HakemboController($http, HakemboFactory) {
		var vm = this;

		/*flattened = [
			[ ["Armando", "P"], ["Dave", "S"] ],
			[ ["Richard", "R"], ["Michael", "S"] ]
		];
		var flattened = flattened.reduce(function(a, b) {
			console.log(a);
			console.log(b);
  			return a.concat(b);
		}, []);
		console.log(flattened);*/
	}
})();