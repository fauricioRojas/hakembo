(function() {
	'use strict';

	angular
		  .module('hakemboApp')
		  .controller('ChampionshipController', ChampionshipController);

  // Inject dependencies.
  ChampionshipController.$inject = ['$timeout', 'ChampionshipFactory'];

  /**
  * Championship controller.
  * @param {Object} Service that meet certain piece of code when certain time has passed.
  * @param {Object} Service that provides functions to help controller's functionality.
  */
	function ChampionshipController($timeout, ChampionshipFactory) {
		  var vm = this;
    	vm.content = '';
    	vm.uploadFile = uploadFile;
    	vm.championship = championship;

      /**
      * Clean the championship UI.
      */
    	function cleanUI() {
          vm.winner = '';
    		  vm.comeOn = false;
    		  document.getElementById('content').textContent = '';
    	}

      /**
      * Read content of a file and show it in the UI.
      * @param {integer} First byte of the file.
      * @param {integer} Last byte of the file.
      */
    	function readBlob(startByte, endByte) {
    		  var files = document.getElementById('file').files;

    		  if (!files.length) {
            	return;
        	}

        	var file = files[0],
        	    start = parseInt(startByte) || 0,
        	    stop = parseInt(endByte) || file.size - 1,
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

      /**
      * Take a file from UI and send it to be read.
      * @param {integer} First byte of the file.
      * @param {integer} Last byte of the file.
      */
    	function uploadFile(evt) {
      		var startByte = evt.target.getAttribute('data-startbyte'),
        	    endByte = evt.target.getAttribute('data-endbyte');

        	readBlob(startByte, endByte);
        	vm.comeOn = true;
    	}

      /**
      * Send the content file to the RESTfulAPI for start championship.
      */
    	function championship() {
          var content = document.getElementById('content').textContent;

          ChampionshipFactory.championship(content)
          .then(function(response) {
              vm.winner = response[0];
        		  vm.strategy = response[1];

        		  $timeout(function() {
          		  cleanUI();
        		  }, 10000);
      	  })
          .catch(function(err) {
              vm.error = "The structure of the championship don't have been respected.";
              vm.error2 = err;

              $timeout(function() {
                vm.error = '';
              }, 10000);
          });
    	}

      //var someVar = "[ [\"fauri\", \"T\"], ]";
      //console.log(JSON.parse(someVar));
  }
})();