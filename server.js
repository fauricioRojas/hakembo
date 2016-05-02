// Require libraries for the app function successfully.
var express = require("express"),  
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    port = Number(process.env.PORT || 3000);

// Assign the libraries for the express app.
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Defines the principal folder in where you will store the home page of the web application.
app.use(express.static(__dirname + "/public"));

// Connection to mongo database.
mongoose.connect('mongodb://localhost/players', function(err, res) {
//mongoose.connect('mongodb://fauricio-1596:dAF-maIELXGYlY5fniDZ@fauricio-1596.mongo.dbs.appsdeck.eu:30285/fauricio-1596', function(err, res) {
  	if(err) {
  		throw err;
  	}
  	
  	console.log('Connected to database!!');
});

// Import models and controllers for the RESTfulAPI.
var PlayerModel = require('./app/models/player')(app, mongoose);
var PlayerController = require('./app/controllers/players');

// Define RESTfulAPI's routes.
var championship = express.Router();

championship.route('/result')
  	.post(PlayerController.result);

championship.route('/top')
  	.get(PlayerController.top);

championship.route('/new')
  	.post(PlayerController.new);

championship.route('/reset')
    .delete(PlayerController.resetDatabase);

app.use('/api/championship', championship);

// The app will listen at port define at the top, in the variable port. 
app.listen(port, function() {  
  	console.log("Node server running on http://localhost:"+port);
});