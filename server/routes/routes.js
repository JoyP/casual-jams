'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    home           = require('../controllers/home'),
    users          = require('../controllers/users'),
    sessions       = require('../controllers/sessions');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(security.authenticate);
  app.use(debug.info);

  app.get('/home', home.index);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.delete('/logout', users.logout);

  app.use(security.bounce);
  app.post('/profile', users.update);
  app.get('/profile', users.find);
  app.post('/newSession', sessions.create);
  app.get('/findSessions', sessions.index);
  app.get('/showSession', sessions.show);

  console.log('Express: Routes Loaded');
};

