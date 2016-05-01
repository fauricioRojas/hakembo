(function() {
	'use strict';

	angular
		.module('hakemboApp')
		.controller('AboutController', AboutController);

	/**
	* About controller.
	*/
	function AboutController() {
		var vm = this;
		vm.name = 'Hi! My name is Fauricio Rojas Hernández.';
		vm.description = "I'm 22 years old and I'm from Pital de San Carlos, Alajuela. Actually I'm a Computer Engineering student at Tecnológico de Costa Rica in Santa Clara of San Carlos. In the second semester of 2016 I will be doing the proffesional practice's carreer. I like so much web development, specially anything related to JavaScript, for example AngularJS, however I can doing another kind of development without problem. I like work in group and can to help others with my knowledge. When I have free time, I like to learn new technologies and interest things. About languages, I want to learn English and German. I like to play and watch soccer so much, I'm a Real Madrid C.F. fan";
		vm.contact = 'Follo me at'
		vm.socialNets = [
			{
				class: 'btn fa fa-facebook',
				url: 'https://www.facebook.com/fauricioRojas'
			},
			{
				class: 'btn fa fa-github',
				url: 'https://github.com/fauricioRojas'
			},
			{
				class: 'btn fa fa-linkedin',
				url: 'https://www.linkedin.com/in/fauriciorojas'
			}
		];
	}
})();