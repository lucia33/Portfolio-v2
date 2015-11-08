var express = require('express');
var express = require('express');
var router = express.Router();


// GET projects page
router.get('/projects', function(req, res, next) {
	res.render('projects', { title: 'Projects'});
});

module.exports = router;
