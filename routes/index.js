var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;
var Contact = models.Contact;
var validator = require('express-validator');
router.use(validator())

router.use(function(req, res, next){
  if (!req.user) {
    res.redirect('/login');
  } else {
    return next();
  }
});
//<----------------- Contact Portion -------------------------->
router.get('/contacts', function(req, res) {
  console.log(req.user)

   Contact.find({owner:req.user}, function(err,result) {
     res.render('contacts', {
       contacts: result
     })
   })
 });

router.get('/contacts/new', function(req, res) {
  res.render('editContact')
})

router.get('/contacts/:id', function(req, res) {
  var id = req.params.id;
  Contact.findById(id, function(error, result) {
    if (error) {
      res.send('Could not find user');
    } else {
      res.render('editContact', result)
    }
  })
})

router.post('/contacts/new', function(req,res) {
  req.checkBody('name', 'Please enter password').notEmpty()
  req.checkBody('number', 'Please enter a password').notEmpty()
  var errors = req.validationErrors();
  if(errors) {
    res.send('There were errors in your making of a contact')
  } else {
    var newContact = new Contact({
      name:req.body.name,
      number:req.body.number,
      owner: req.user
    });
    console.log(newContact)
    newContact.save(function(error, result) {
      if(error) {
        res.send('There was an error saving');
      } else {
        res.redirect('/contacts')
      }
    })
  }
})

router.post('/contacts/new/:id', function(req, res) {
  var id = req.params.id;
  Contact.findByIdAndUpdate(id,{name:req.body.name, number:req.body.number}, function(error, result) {
    if(error) {
      res.send("There was an an error finding your ID and Updating")
    } else {
      res.redirect('/contacts')
    }
  })

})

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // Your code here.
// });

module.exports = router;
