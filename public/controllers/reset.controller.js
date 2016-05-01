(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('ResetController', ResetController);

	// Inject dependencies.
	ResetController.$inject = ['$scope', '$timeout', 'ResetFactory'];

	/**
	* Reset controller.
	* @param {Object} Object allows the UI-controller union.
	* @param {Object} Object that meets certain piece of code when certain time has passed.
	* @param {Object} Service that provides functions to help controller's functionality.
	*/
	function ResetController($scope, $timeout, ResetFactory) {
		var vm = this;
		vm.resetDatabase = resetDatabase;
		vm.resetMsg = '';

		/**
		* Assign a watcher to the confirm variable.
		*/
		$scope.$watch('confirm', validateReset);

		/**
		* Validate the confirm is correct.
		*/
		function validateReset() {
			if ($scope.confirm !== 'players') {
                vm.resetOK = true;
            } 
            else {
                vm.resetOK = false;
            }
		}

		/**
		* Reset the database.
		*/
		function resetDatabase() {
			vm.resetMsg = '';	
			
			ResetFactory.resetDatabase()
			.then(function(response) {
				if (response.status === 'success') {
					$scope.confirm = '';
					vm.resetStyle = 'success-box';
					vm.resetMsg = 'The database was cleaned up and started over successfully.';

					$timeout(function() {
						vm.resetMsg = '';					
					}, 5000);
				}
				else {
					vm.resetStyle = 'error-box';
					vm.resetMsg = 'An unexpected error has occured, please try again.';
				}
			})
			.catch(function(err) {
				vm.resetStyle = 'error-box';
				vm.resetMsg = 'An unexpected error has occured, please try again.';
			});
		}
	}
})();