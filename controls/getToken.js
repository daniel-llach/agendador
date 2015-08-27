var url = require('url');
var mysql = require('mysql');
var request = require('request');
var config = require('./../config');

module.exports = function(req, res, next){
  var tokenUri = req.query.t; // token in url
  if(tokenUri == null){
    // no token in url
    req.user = null;
    return next();
  }else{
    // with token in url
    request.get({
      uri: config.url_faccount + '/secret?access_token=' + tokenUri
    }, function(err, httpResponse, user){
      if (err) {
        return console.error('get failed:', err);
      }else{
        if(user == 'no valid'){
          res.redirect(303, config.url_daccount + '/login');
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
