var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

// GET about page
router.get('/about', function(req, res, next) {
	res.render('about', { title: 'About'});
});


// GET contact page
router.get('/contact', function(req, res, next) {
	res.render('contact', { title: 'Contact Me'});
});

// GET projects page
router.get('/projects', function(req, res, next) {
	res.render('projects', { title: 'Projects'});
});

// GET services page
router.get('/services', function(req, res, next) {
	res.render('services', { title: 'Services'});
})

// router.get('/business-contact', function(req, res, next) {
// 	res.render('business-contact', { title: 'Services'});
// })

/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/about');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/about',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/about',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
