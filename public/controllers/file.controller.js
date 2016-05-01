(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('FileController', FileController);

	function FileController() {
		var vm = this;
		vm.files = [
					{
						title: 'First file',
						content: "[ [\"Armando\", \"P\"], [\"Dave\", \"S\"] ]",
						rows: 1
					},
					{
						title: 'Second file',
						content: "[\n\t[\n\t\t[ [\"Armando\", \"P\"], [\"Dave\", \"S\"] ],\n\t\t[ [\"Richard\", \"R\"], [\"Michael\", \"S\"] ]\n\t],\n\t[\n\t\t[ [\"Allen\", \"S\"], [\"Omer\", \"P\"] ],\n\t\t[ [\"John\", \"R\"], [\"Robert\", \"P\"] ]\n\t]\n]",
						rows: 10
					},
					{
						title: 'Third file',
						content: "[\n\t[\n\t\t[\n\t\t\t[ [\"Carlos\", \"P\"], [\"Fauricio\", \"S\"] ],\n\t\t\t[ [\"Daniel\", \"R\"], [\"Arturo\", \"P\"] ]\n\t\t],\n\t\t[\n\t\t\t[ [\"Eder\", \"R\"], [\"Gabriel\", \"P\"] ],\n\t\t\t[ [\"Miguel\", \"P\"], [\"Mainor\", \"S\"] ]\n\t\t]\n\t],\n\t[\n\t\t[\n\t\t\t[ [\"Andrés\", \"R\"], [\"Mauricio\", \"P\"] ],\n\t\t\t[ [\"Brian\", \"P\"], [\"Kenneth\", \"S\"] ] ],\n\t\t[\n\t\t\t[ [\"Yorbi\", \"R\"], [\"Cristian\", \"P\"] ],\n\t\t\t[ [\"Maikol\", \"P\"], [\"Julio\", \"S\"] ]\n\t\t]\n\t]\n]",
						rows: 21
					},
					{
						title: 'Fourth file',
						content: "[\n\t[\n\t\t[\n\t\t\t[\n\t\t\t\t[ [\"Carlos\", \"P\"], [\"Fauricio\", \"S\"] ],\n\t\t\t\t[ [\"Daniel\", \"R\"], [\"Arturo\", \"P\"] ]\n\t\t\t],\n\t\t\t[\n\t\t\t\t[ [\"Eder\", \"R\"], [\"Gabriel\", \"P\"] ],\n\t\t\t\t[ [\"Miguel\", \"P\"], [\"Mainor\", \"S\"] ]\n\t\t\t]\n\t\t],\n\t\t[\n\t\t\t[\n\t\t\t\t[ [\"Andrés\", \"R\"], [\"Mauricio\", \"P\"] ],\n\t\t\t\t[ [\"Brian\", \"P\"], [\"Kenneth\", \"S\"] ] ],\n\t\t\t[\n\t\t\t\t[ [\"Yorbi\", \"R\"], [\"Cristian\", \"P\"] ],\n\t\t\t\t[ [\"Maikol\", \"P\"], [\"Julio\", \"S\"] ]\n\t\t\t]\n\t\t]\n\t],\n\t[\n\t\t[\n\t\t\t[\n\t\t\t\t[ [\"Carlos\", \"P\"], [\"Fauricio\", \"S\"] ],\n\t\t\t\t[ [\"Daniel\", \"R\"], [\"Arturo\", \"P\"] ]\n\t\t\t],\n\t\t\t[\n\t\t\t\t[ [\"Eder\", \"R\"], [\"Gabriel\", \"P\"] ],\n\t\t\t\t[ [\"Miguel\", \"P\"], [\"Mainor\", \"S\"] ]\n\t\t\t]\n\t],\n\t\t[\n\t\t\t[\n\t\t\t\t[ [\"Andrés\", \"R\"], [\"Mauricio\", \"P\"] ],\n\t\t\t\t[ [\"Brian\", \"P\"], [\"Kenneth\", \"S\"] ] ],\n\t\t\t[\n\t\t\t\t[ [\"Yorbi\", \"R\"], [\"Cristian\", \"P\"] ],\n\t\t\t\t[ [\"Maikol\", \"P\"], [\"Julio\", \"S\"] ]\n\t\t\t]\n\t\t]\n\t]\n]",
						rows: 44
					},
				];	

		vm.downloadFile = downloadFile;

		function downloadFile(file) {
			var blob = new Blob([file], {type: "text/plain;charset=utf-8"});
			saveAs(blob, "Rock-Paper-Scissors.txt");
		}
	}
})();