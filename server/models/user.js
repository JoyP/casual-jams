'use strict';

var bcrypt = require('bcrypt'),
    _      = require('underscore'),
    Mongo  = require('mongodb'),
    async  = require('async');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, function(err, obj){
    var user = Object.create(User.prototype);
    user = _.extend(user, obj);
    cb(err, user);
  });
};

User.findMembers = function(idArray, cb){
  var members  = [];
  // loops through member array to find user objects
  async.map(idArray, findEach, function(err, result){
    members = result;
    cb(err, members);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user || o.password.length < 3){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    o.joinedSessions = [];
    User.collection.save(o, cb);
  });
};

User.login = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.prototype.save = function(fields, cb){
  // TO DO: check email against database so there are no duplicates upon update
  var properties = Object.keys(fields),
      self       = this;

  properties.forEach(function(property){
    self[property] = fields[property];
  });

  this._id = Mongo.ObjectID(this._id);
  User.collection.save(this, cb);
};

module.exports = User;

// HELPER FUNCTIONS

function findEach(memberId, cb){
  memberId = Mongo.ObjectID(memberId);
  User.collection.findOne({_id:memberId}, function(err, member){
    cb(err, member);
  });
}


