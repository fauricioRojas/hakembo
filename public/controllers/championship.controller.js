(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('ChampionshipController', ChampionshipController);

	ChampionshipController.$inject = ['$http', '$timeout', 'ChampionshipFactory'];
	function ChampionshipController($http, $timeout, ChampionshipFactory) {
		var vm = this;
		vm.content = '';
		vm.uploadFile = uploadFile;
		vm.championship = championship;

		function readBlob(opt_startByte, opt_stopByte) {
    		var files = document.getElementById('file').files;

    		if (!files.length) {
      			return;
    		}

		    var file = files[0];
		    var start = parseInt(opt_startByte) || 0;
		    var stop = parseInt(opt_stopByte) || file.size - 1;

		    var reader = new FileReader();

    		// If we use onloadend, we need to check the readyState.
    		reader.onloadend = function(evt) {
      			if (evt.target.readyState == FileReader.DONE) {
        			document.getElementById('content').textContent = evt.target.result;
      			}
    		};

    		var blob = file.slice(start, stop + 1);
    		reader.readAsBinaryString(blob);
  		}

		function uploadFile(evt) {
			var startByte = evt.target.getAttribute('data-startbyte');
  			var endByte = evt.target.getAttribute('data-endbyte');
  			readBlob(startByte, endByte);
  		}

  		function championship() {
  			var content = document.getElementById('content').textContent;

  			ChampionshipFactory.championship(content)
  			.then(function(response) {
  				vm.winner = response[0];
  				vm.strategy = response[1];

  				$timeout(function() {
  					vm.winner = '';
  					document.getElementById('content').textContent = '';
  				}, 10000);
  			});
  		}
	}
})();