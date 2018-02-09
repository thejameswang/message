var express = require('express');
var router = express.Router();
var models = require('../models/models');

module.exports = function(passport) {
  // Add Passport-related auth routes here, to the router!
  // YOUR CODE HERE
  // Regular route which directs to contacts or login page
  router.get('/', function(req,res) {
    if(req.user) {
      res.redirect('/contacts')
    } else {
      res.redirect('/login')
    }
  })
  //Sign up route
  router.get('/signup', function(req, res) {
    res.render('signup');
  });

  // POST registration page
  var validateReq = function(userData) {
    return (userData.password === userData.passwordRepeat);
  };

  router.post('/signup', function(req, res) {
    if (!validateReq(req.body)) {
      return res.render('signup', {
        error: "Passwords don't match."
      });
    }
    var u = new models.User({
      username: req.body.username,
      password: req.body.password,
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }
      console.log(user);
      res.redirect('/login');
    });
  });

  router.get('/login', function(req, res) {
    res.render('login');
  });

  router.post('/login',passport.authenticate('local'), function(req,res) {
    res.redirect('/')
  })

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  return router;
}
