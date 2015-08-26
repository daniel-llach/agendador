var url = require('url');
var mysql = require('mysql');
var localStorage = require('localStorage');
var request = require('request');

module.exports = function(req, res, next){
  var tokenUri = req.query.t; // token in url
  var tokenStorage = localStorage.getItem('access_token');  // token in localStorage

  if(tokenUri == null){
    // no token url
    if(tokenStorage){
      // with token in storage
      request.get({
        uri: 'http://localhost:5000/secret?access_token=' + tokenStorage
      }, function(err, httpResponse, user){
        if (err) {
          // return console.error('get failed:', err);
          localStorage.removeItem('access_token');
          res.redirect(303, 'http://localhost:4000/login');
        }
        if(user){
          req.user = user;
          return next();
        }else{
          localStorage.removeItem('access_token');
          res.redirect(303, 'http://localhost:4000/login');
        }
      })
    }
  }else{
    // with token in url
    request.get({
      uri: 'http://localhost:5000/secret?access_token=' + tokenUri
    }, function(err, httpResponse, user){
      if (err) {
        return console.error('get failed:', err);
      }else{
        localStorage.setItem('access_token', tokenUri);
        req.user = user;
        return next();
      }
    })
  }
}
