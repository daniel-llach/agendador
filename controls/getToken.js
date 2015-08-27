var url = require('url');
var mysql = require('mysql');
var request = require('request');
var colors = require('colors');

module.exports = function(req, res, next){
  // local store
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

  var tokenUri = req.query.t; // token in url
  console.log("tokenUri: ", tokenUri);
  var tokenStorage = localStorage.getItem('access_token');  // token in localStorage
  console.log("tokenStorage: ", tokenStorage);
  if(tokenUri == null){
    // no token url
    console.log("if tokenUri");
    if(tokenStorage){
      // with token in storage
      console.log("tokenStorage exist!");
      request.get({
        uri: 'http://localhost:5000/secret?access_token=' + tokenStorage
      }, function(err, httpResponse, user){
        if(user == 'no valid'){
          console.log("token no valid");
          res.redirect(303, 'http://localhost:4000/login');
        }else if(user){
          console.log("valid token");
          // localStorage.setItem('access_token', user);
          // console.log("setea tokenStorage: ", user);
          req.user = user;
          console.log("next".green);
          return next();
        }else{
          console.log("token en localstorage desconocido");
        }
      })
    }
  }else{
    // with token in url
    console.log("if url");
    request.get({
      uri: 'http://localhost:5000/secret?access_token=' + tokenUri
    }, function(err, httpResponse, user){
      if (err) {
        return console.error('get failed:', err);
      }else{
        if(user == 'no valid'){
          console.log("token no valid");
          res.redirect(303, 'http://localhost:4000/login');
        }else if(user){
          localStorage.setItem('access_token', tokenUri);
          console.log("set localstorage token: ", tokenUri);
          req.user = user;
          console.log("next".green);
          return next();
        }else{
          console.log("token en url desconocido");
        }
      }
    })
  }
}
