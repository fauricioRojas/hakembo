(function() {
	'use strict';

	angular
		  .module('hakemboApp')
		  .controller('ChampionshipController', ChampionshipController);

  /**
  * Validate if a player exists or no, if exists add the player else increase the user's score.
  * @param {string} Player's username.
  * @param {integer} Score's username.
  * @param {Object} Object with information for response.
  * @returns {Object} If occurs an error.
  */
	function ChampionshipController($http, $timeout, ChampionshipFactory) {
		  var vm = this;
    	vm.content = '';
    	vm.uploadFile = uploadFile;
    	vm.championship = championship;

    	function cleanUI() {
    		vm.winner = '';
    		vm.comeOn = false;
    		document.getElementById('content').textContent = '';
    	}

    	function readBlob(opt_startByte, opt_stopByte) {
    		var files = document.getElementById('file').files;

    		if (!files.length) {
            	return;
        	}

        	var file = files[0],
        	    start = parseInt(opt_startByte) || 0,
        	    stop = parseInt(opt_stopByte) || file.size - 1,
        	    reader = new FileReader(),
        	    blob;

        	// If we use onloadend, we need to check the readyState.
        	reader.onloadend = function(evt) {
            	if (evt.target.readyState == FileReader.DONE) {
            		var content = evt.target.result;

              		if (content[2] === '¿') {
              			content = content.slice(3, content.length);
              		}

              		document.getElementById('content').textContent = content;
            	}
    		};

    		blob = file.slice(start, stop + 1);
        	reader.readAsBinaryString(blob);
    	}

    	function uploadFile(evt) {
      		var startByte = evt.target.getAttribute('data-startbyte'),
        	    endByte = evt.target.getAttribute('data-endbyte');

        	readBlob(startByte, endByte);
        	vm.comeOn = true;
      	}

      	function championship() {
        	var content = document.getElementById('content').textContent;

        	ChampionshipFactory.championship(content)
        	.then(function(response) {
          		vm.winner = response[0];
          		vm.strategy = response[1];

          		$timeout(function() {
            		cleanUI();
          		}, 5000);
        	});
      	}
	}
})();