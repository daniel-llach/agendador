var url = require('url')
var mysql = require('mysql');
var localStorage = require('localStorage');
var request = require('request');

module.exports = function(req, res, next){
  if(req.user){
    // get scenarios
    request.get({
      uri: 'http://localhost/darwined/big_branch/api_scenarios'
    }, function(err, httpResponse, scenarios){
      if (err) {
        return console.error('get failed:', err);
      }else{
        req.scenarios = scenarios;
        return next();
      }
    })
  }else{
    req.escenarios = null;
    return next();
  }

}
