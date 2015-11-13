var express = require('express');
var passport = require('passport');
var router = express.Router();

var mongoose = require('mongoose');
var Businesscontact = require('../models/businesscontact');
var User = require('../models/user');


/* Utility functin to check if businesscontact is authenticatd */
function requireAuth(req, res, next){

  // check if the businesscontact is logged in
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}

/* Render businesscontact main page. */
router.get('/', requireAuth, function (req, res, next) {
    Businesscontact.find(function (err, businesscontacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('businesscontacts/index', {
                title: 'Business Contact',
                businesscontacts: businesscontacts,
                // displayName: req.businesscontact ? req.businesscontact.displayName : ''
            });
        }
    }).sort({name:1}); //sort the documents in order by column "name"
});

// add,edit,delete

/* Render the Add businesscontact Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('businesscontacts/add', {
        title: 'Add a contact',
        // displayName: req.businesscontact ? req.businesscontact.displayName : ''
    });
});

/* process the submission of a new businesscontact */
router.post('/add', requireAuth, function (req, res, next) {
    var businesscontact = new Businesscontact(req.body);
    Businesscontact.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        created: Date.now(),
    }, function (err, businesscontacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontacts');
        }
    });
});

/* Render the businesscontact Edit Page */
router.get('/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right businesscontact
    Businesscontact.findById(id, function (err, businesscontacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('businesscontacts/edit', {
                title: 'Edit a contact',
                businesscontacts: businesscontacts,
                // displayName: req.businesscontact ? req.businesscontact.displayName : ''
            });
        }
    });
});

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var businesscontact = new Businesscontact(req.body);
    businesscontact._id = id;
    
    // use mongoose to do the update
    Businesscontact.update({ _id: id }, businesscontact, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontacts');
        }
    });
});

/* run delete on the selected businesscontact */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Businesscontact.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontacts');
        }
    });
});

module.exports = router;
