'use strict';

var Session = require('../models/session');

exports.create = function(req, res){
  Session.create(req.user._id, req.body, function(err, session){
    if(session){
      res.send({session:session});
    }else{
      res.status(400).end();
    }
  });
};

exports.index = function(req, res){
  Session.findAll(function(err, sessions){
    res.send({sessions:sessions});
  });
};

exports.show = function(req, res){
  console.log('req.session in exports.show>>>>>>>>>>', req.session);
  console.log('req in exports.show>>>>>>>>>>', req);
};
