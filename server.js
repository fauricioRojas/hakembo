var express = require("express"),  
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    port = Number(process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

app.use(express.static(__dirname + "/public"));

// Connection to DB
mongoose.connect('mongodb://localhost/players', function(err, res) {
//mongoose.connect('mongodb://fauricio-1596:dAF-maIELXGYlY5fniDZ@fauricio-1596.mongo.dbs.appsdeck.eu:30285/fauricio-1596', function(err, res) {
  	if(err) {
  		throw err;
  	}
  	
  	console.log('Connected to database!!');
});

// Import Models and controllers
var PlayerModel = require('./app/models/player')(app, mongoose);
var PlayerController = require('./app/controllers/players');

// API routes
var championship = express.Router();

championship.route('/result')
  	.post(PlayerController.result);

championship.route('/top')
  	.get(PlayerController.top);

championship.route('/new')
  	.post(PlayerController.championship);

championship.route('/all')
  	.get(PlayerController.findAll);

championship.route('/reset')
    .delete(PlayerController.resetDatabase);

app.use('/api/championship', championship);

app.listen(port, function() {  
  	console.log("Node server running on http://localhost:"+port);
});