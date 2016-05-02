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
		vm.developerName = 'Hi! My name is Fauricio Rojas Hernández.';
		vm.developerDescription = "I'm 22 years old and I'm from Pital de San Carlos, Alajuela. Actually I'm a Computer Engineering student at Tecnológico de Costa Rica in Santa Clara of San Carlos. In the second semester of 2016 I will be doing the proffesional practice's carreer. I like so much web development, specially anything related to JavaScript, for example AngularJS, however I can doing another kind of development without problem. I like work in group and can to help others with my knowledge. When I have free time, I like to learn new technologies and interest things. About languages, I want to learn English and German. I like to play and watch soccer so much, I'm a Real Madrid C.F. fan.";
		vm.developerContact = 'Follo me at'
		vm.developerSocialNets = [
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

		vm.technologies = 'Technologies used';
		vm.mean = '../img/mean.png';
		vm.technologiesDescriptions = [
			"This web app was developed with MEAN JavaScript software stack. It's formed by MongoDB, ExpressJS, AngularJS and NodeJS. All of the MEAN components are written in JavaScript, both the front-end and back-end are writen in the same language. AngularJS is a powerfull framework that allows to developers a great facility for design front-end, MongoDB is very easy to use because it's a NoSQL database, both node and express facility back-end development and runtime environment. To make a better UI design, I used Twitter Bootstrap framework and Font Awesome.",
		    "I'm fan of AngularJS and JavaScript, I really like to develop with they and the facility for development in a only language in front-end and back-end are the reasons because I choosed use the MEAN."
	    ];
		
		vm.solution = 'Solution implemented';
		vm.solutionDescriptions = [
			{
				text: "The structure of the championship is equal to a binary tree, each duel is formed by 2 persons with their respective strategy, the winner of each duel moves to the next key and so on until a player wins. It's important to clear that each player only should play once for each round.",
				steps: []
			},
			{
				text: "Then each of the steps for determine the winner of a championship:",
				steps: [
					'Validate that the structure of the championship be an array.',
					'Each of the keys (remember that the structure is a binary tree) sends to evaluate for determine the winner of the key.',
					'The form of evaluate each key is recursively, I thought about another way to evaluate it but the championship is evaluated from the lowest level (leaves) to the highest level (root) but to reach the lowest level must first go over the championship, for each key a winner is obtained, it must be returned for create a new key with another player and so on until to determine the semifinalist.',
					"For each duel, it's verify that have two players and their strategy be valid (R, P or S).",
					'At this point we have the semifinalists, both are sent to evaluate and determinated the champion and subchampion.'
				]
			}
		];

		vm.source = 'Source code';
		vm.sourceDescription = 'For see the source code of the web app, click in the GitHub icon';
		vm.sourceLink = 'https://github.com/fauricioRojas/hakembo';
	}
})();