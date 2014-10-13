'use strict';

var Mongo  = require('mongodb'),
    async  = require('async');

function JamSession(userId, o){
  this.name     = o.name;
  this.style    = o.style;
  this.details  = o.details;
  this.loc      = o.loc;
  this.date     = new Date(o.date);
  this.time     = o.time;
  this.hostId   = Mongo.ObjectID(userId);
  this.members  = [];
}

Object.defineProperty(JamSession, 'collection', {
  get: function(){return global.mongodb.collection('jamSessions');}
});

JamSession.create = function(userId, o, cb){
  var s = new JamSession(userId, o);
  JamSession.collection.save(s, cb);
};

JamSession.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  JamSession.collection.findOne({_id:_id}, function(err, obj){
    var jamSession = Object.create(JamSession.prototype);
    jamSession = _.extend(jamSession, obj);
    cb(err, jamSession);
  });
};

JamSession.findAll = function(cb){
  JamSession.collection.find().toArray(cb);
};

JamSession.findByHost = function(id, cb){
  var _id = Mongo.ObjectID(id);
  JamSession.collection.find({hostId:_id}).toArray(cb);
};

JamSession.prototype.save = function(fields, cb){
  var properties = Object.keys(fields),
      self       = this;

  properties.forEach(function(property){
    switch(property){
      case 'date':
        self.date = new Date(fields[property]);
        break;
      default:
        self[property] = fields[property];
      }
  });

  this.hostId = Mongo.ObjectID(this.hostId);
  this._id = Mongo.ObjectID(this._id);
  JamSession.collection.save(this, cb);
};

JamSession.findJoinedSessions = function(idArray, cb){
  var jamSessions  = [];
  // loops through session array to find session objects
  async.map(idArray, findEach, function(err, result){
    jamSessions = result;
    cb(err, jamSessions);
  });
};

module.exports = JamSession;

function findEach(sessionId, cb){
  sessionId = Mongo.ObjectID(sessionId);
  JamSession.collection.findOne({_id:sessionId}, function(err, session){
    cb(err, session);
  });
}
