var url = require('url')
var mysql = require('mysql');
var localStorage = require('localStorage');
var request = require('request');
var config = require('./../config');

module.exports = function(req, res, next){
  // resultados has been load?
  if(req.resultados){
    return next();
  }else{
    // get resultados
    request.get({
      uri: config.url_darwined + '/api_resultados?proceso_id=' + req.params.proceso_id + '&semana_id=' + req.params.semana_id
    }, function(err, httpResponse, resultados){
      if (err) {
        return console.error('get failed:', err);
      }else{
        // setea resultados 1 sola vez
        req.resultados = JSON.parse(resultados);
        console.log("resultados cargados");
        return next();
      }
    })

  }


}
