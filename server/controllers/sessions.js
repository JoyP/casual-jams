'use strict';

var Session = require('../models/session');

exports.index = function(req, res){
};

exports.create = function(req, res){
  console.log('req.body in exports.create>>>>>>', req.body);
  Session.create(req.body, function(err, session){
    console.log('session after create function called in controller', session);
    if(session){
      res.status(200).end();
    }else{
      res.status(400).end();
    }
  });
};
