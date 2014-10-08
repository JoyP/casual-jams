'use strict';

var Mongo  = require('mongodb');

function Session(o){
  this.name   = o.name;
  this.style  = o.style;
  this.loc    = o.loc;
  this.date   = new Date(o.date);
  this.time   = o.time;
}

Object.defineProperty(Session, 'collection', {
  get: function(){return global.mongodb.collection('sessions');}
});

Session.create = function(o, cb){
  console.log('o in Session.create in controller>>>>>', o);
  var s = new Session(o);
  Session.collection.save(s, cb);
};

Session.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Session.collection.findOne({_id:_id}, function(err, obj){
    var session = Object.create(Session.prototype);
    session = _.extend(session, obj);
    //console.log('user in User model, User.findbyId>>>>', user);
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


module.exports = Session;

