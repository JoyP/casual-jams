'use strict';

var Mongo  = require('mongodb');

function Session(){
}

Object.defineProperty(Session, 'collection', {
  get: function(){return global.mongodb.collection('sessions');}
});

Session.create = function(o, cb){
  console.log('o in Session.create in controller>>>>>', o);
  o.date = new Date(o.date);
  Session.collection.save(o, cb);
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

