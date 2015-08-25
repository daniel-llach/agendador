/*
 * Load up the project dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var url = require('url'); // req.body

/*
 * Create Express app
 */
app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// view engine
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

/*
 * A simple middleware to restrict access to authenticated users.
 */
 var tokenacces = require('./controls/getToken');
 var getscenarios = require('./controls/getscenarios');

/*
 * Start listening
 */
var server = app.listen(3000, function() {
	console.log('Agendador Listening on port %d'.green, server.address().port)
});

/*
 * Protected routes
 */
app.get('/', tokenacces, getscenarios, function(req, res){
    res.render('index',{
      user: req.user,
      scenarios: req.scenarios
    } );
});
