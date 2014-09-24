'use strict';

var Mongo  = require('mongodb');

function Session(){
}

Object.defineProperty(Session, 'collection', {
  get: function(){return global.mongodb.collection('session');}
});

Session.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Session.collection.findOne({_id:_id}, cb);
};

//Session.find = function(filter, cb){
//  Session.collection.findOne({filter}, function(err, session){
//    cb(session);
//  });
//};


module.exports = Session;

