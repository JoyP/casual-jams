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
  User.findById(req.body.hostId, function(err, user){
    User.findMembers(req.body.members, function(err, members){
      // returns host object and member objects
      res.send({user:user, members:members});
    });
  });
};

exports.mySessions = function(req, res){
  JamSession.findByHost(req.user._id, function(err, hostedSessions){
    JamSession.findJoinedSessions(req.user.joinedSessions, function(err, joinedSessions){
      console.log('hostedSessions in exports.mySessions>>>>>>', hostedSessions);
      console.log('joinedSessions in exports.mySessions>>>>>>', joinedSessions);
      res.send({hosted:hostedSessions, joined:joinedSessions});
    });
  });
};
