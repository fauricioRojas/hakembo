(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('ResetController', ResetController);

	ResetController.$inject = ['$scope', '$http', '$timeout', 'ResetFactory'];
	function ResetController($scope, $http, $timeout, ResetFactory) {
		var vm = this;
		vm.resetDatabase = resetDatabase;
		vm.resetMsg = '';

		$scope.$watch('database', function() {
            if ($scope.database !== 'players') {
                vm.resetOK = true;
            } 
            else {
                vm.resetOK = false;
            }
		});

		function resetDatabase() {
			vm.resetMsg = '';	
			
			ResetFactory.resetDatabase()
			.then(function(response) {
				if (response.status === 'success') {
					$scope.database = '';
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
			});
		}
	}
})();