var url = require('url')
var mysql = require('mysql');
var localStorage = require('localStorage');
var request = require('request');

module.exports = function(req, res, next){
  var tokenStorage = localStorage.getItem('access_token');
  if(tokenStorage){
    // with token in storage
    request({
      method: 'GET',
      uri: 'http://localhost:5000/secret?access_token=' + tokenStorage
    }, function(err, httpResponse, user){
      if (err) {
        return console.error('get failed:', err);
      }
      res.render('index', {data:user});
    })
  }else{
    // no Token in url
    var tokenUri = req.query.t;
    if(tokenUri == null){
      res.redirect(303, 'http://localhost:4000/login');
    }else{
      // with token in url
      request({
        method: 'GET',
        uri: 'http://localhost:5000/secret?access_token=' + tokenUri
      }, function(err, httpResponse, user){
        if (err) {
          return console.error('get failed:', err);
        }
        res.render('index', {data:user});
        localStorage.setItem('access_token', tokenUri);
      })
      next();
    }
  }

}
