"use strict";

require.config({
    paths : {
        backbone : "../bower_components/backbone/backbone",
        underscore : "../bower_components/underscore/underscore",
        jquery : "../bower_components/jquery/dist/jquery",
        "backbone.marionette" : "../bower_components/backbone.marionette/lib/core/backbone.marionette",
        "backbone.radio" : "../bower_components/backbone.radio/build/backbone.radio",
        "backbone.babysitter" : "../bower_components/backbone.babysitter/lib/backbone.babysitter",
        text: "../bower_components/requirejs-text/text",
        "assets": "../assets"
    },
    enforceDefine: true,
    map: {
        '*': {
            'backbone.wreqr': 'backbone.radio'
        }
    }
});

define([
    "backbone.radio"
], function (App, Radio) {
    window.Radio = Radio;

    console.log("marionette ok");

    $.ajax({
      method: "GET",
      url: "http://localhost:3000/resultados/35/2" // proceso_id/semana_id
    }).done(function( data ) {
      console.log("data: ", data);
    });
});
