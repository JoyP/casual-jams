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
    console.log('req.user in exports.mySessions>>>>>>', req.user);
    JamSession.findJoinedSessions(req.user.joinedSessions, function(err, joinedSessions){
      console.log('hostedSessions in exports.mySessions>>>>>>', hostedSessions);
      console.log('joinedSessions in exports.mySessions>>>>>>', joinedSessions);
      res.send({hosted:hostedSessions, joined:joinedSessions});
    });
  });
};

exports.joinSession = function(req, res){
  JamSession.findById(req.body.jamSession._id, function(err, session){
    console.log('session in exports.joinSession>>>', session);
    session.join(req.user._id, function(err, cb){
      User.findById(req.user._id, function(err, member){
        console.log('first member in exports.joinSession>>>', member);
        console.log('err in exports.joinSession>>>', err);
        console.log('cb in exports.joinSession>>>', cb);
        console.log('session._id in exports.joinSession>>>', session._id);
        member.joinedSessions.push(session._id);
          console.log('second member in exports.joinSession>>>', member);
        User.collection.save(member, function(err, cb){
          console.log('err in exports.joinSession>>>', err);
          console.log('cb in exports.joinSession>>>', cb);
          console.log('third member in exports.joinSession>>>', member);
          res.send({jamSession:session, user:member});
        });
      });
    });
  });
};
