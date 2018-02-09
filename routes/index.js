var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;

router.use(function(req, res, next){
  if (!req.user) {
    res.redirect('/login');
  } else {
    return next();
  }
});
/* GET home page. */
// router.get('/', function(req, res, next) {
//   // Your code here.
// });

module.exports = router;
