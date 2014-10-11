'use strict';

var JamSession  = require('../models/jamSession'),
    User        = require('../models/user');

exports.create = function(req, res){
  JamSession.create(req.user._id, req.body, function(err, jamSession){
    if(jamSession){
      res.send({jamSession:jamSession});
    }else{
      res.status(400).end();
    }
  });
};

exports.index = function(req, res){
  JamSession.findAll(function(err, jamSessions){
    res.send({jamSessions:jamSessions});
  });
};

exports.show = function(req, res){
  console.log('req.params in exprts.shw>>>>>>>>>>', req.params);
  User.findById(req.params.hostId, function(err, user){
    res.send({user:user});
  });
};
