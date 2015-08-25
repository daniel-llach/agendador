var url = require('url');
var mysql = require('mysql');
var localStorage = require('localStorage');
var request = require('request');

module.exports = function(req, res, next){
  var tokenStorage = localStorage.getItem('access_token');
  if(tokenStorage){
    // with token in storage
    request.get({
      uri: 'http://localhost:5000/secret?access_token=' + tokenStorage
    }, function(err, httpResponse, user){
      if (err) {
        return console.error('get failed:', err);
      }
      // res.render('index', {data:user});
      console.log("user: ", user);
      req.user = user;
      return next();
    })
  }else{
    // no Token in storage
    var tokenUri = req.query.t;
    if(tokenUri == null){
      res.redirect(303, 'http://localhost:4000/login');
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
          // res.render('index', {data:user});
          return next();
        }
      })
    }
  }

}
