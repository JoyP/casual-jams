'use strict';

var Mongo  = require('mongodb');

function Session(userId, o){
  this.name   = o.name;
  this.style  = o.style;
  this.loc    = o.loc;
  this.date   = new Date(o.date);
  this.time   = o.time;
  this.hostId = Mongo.ObjectID(userId);
}

Object.defineProperty(Session, 'collection', {
  get: function(){return global.mongodb.collection('sessions');}
});

Session.create = function(userId, o, cb){
  var s = new Session(userId, o);
  Session.collection.save(s, cb);
};

Session.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Session.collection.findOne({_id:_id}, function(err, obj){
    var session = Object.create(Session.prototype);
    session = _.extend(session, obj);
    cb(err, session);
  });
};

Session.findAll = function(cb){
  Session.collection.find().toArray(cb);
};

//Session.find = function(filter, cb){
//  Session.collection.findOne({filter}, function(err, session){
//    cb(session);
//  });
//};

Session.prototype.save = function(fields, cb){
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
  Session.collection.save(this, cb);
};

module.exports = Session;

