/*
 * Load up the project dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var colors = require('colors');
var url = require('url'); // req.body
var fs = require('fs');
var io = require('socket.io');

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
 var getToken = require('./controls/getToken');
 var getScenarios = require('./controls/getScenarios');
 var getResultados = require('./controls/getResultados');

/*
 * Start listening
 */
var server = app.listen(3000, function() {
	console.log('Agendador Listening on port %d'.green, server.address().port)
});

/*
 * Protected routes
 */
app.get('/', getToken, getScenarios, function(req, res){
    if(req.user || req.escenarios){
      res.render('index',{
        user: req.user,
        scenarios: req.scenarios
      });
      // set locals
      app.locals.user = JSON.parse(req.user);
    }else{
      res.render('getAccess');
    }
});

/*
 * Unprotected routes
 */
app.get('/resultados/:proceso_id/:semana_id', getResultados, function(req, res){
  res.json(req.resultados);
});


/*
 * Socket.io connections
 */
var serv_io = io.listen(server);
serv_io.sockets.on('connection', function(socket) {
  socket.on('testconnection', function(){
    socket.broadcast.emit('testthis', app.locals.user.username + ' acaba de iniciar sesion');
  });
});
