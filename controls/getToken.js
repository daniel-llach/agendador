var url = require('url');
var mysql = require('mysql');
var request = require('request');

module.exports = function(req, res, next){
  var tokenUri = req.query.t; // token in url
  if(tokenUri == null){
    // no token in url
    req.user = null;
    return next();
  }else{
    // with token in url
    request.get({
      uri: 'http://localhost:5000/secret?access_token=' + tokenUri
    }, function(err, httpResponse, user){
      if (err) {
        return console.error('get failed:', err);
      }else{
        if(user == 'no valid'){
          res.redirect(303, 'http://localhost:4000/login');
        }else if(user){
          req.user = user;
          return next();
        }else{
          console.log("token en url desconocido");
        }
      }
    });
  }
}
