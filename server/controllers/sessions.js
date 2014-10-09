'use strict';

var Session = require('../models/session');

exports.index = function(req, res){
};

exports.create = function(req, res){
  Session.create(req.user._id, req.body, function(err, session){
    if(session){
      res.send({session:session});
    }else{
      res.status(400).end();
    }
  });
};

exports.findAll = function(req, res){
  Session.findAll(function(err, sessions){
    res.send({sessions:sessions});
  });
};

