var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
  console.log(req.user);
  console.log("juuuuudy");

	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'report';
	
	// Render the view
	view.render('report');
	
};
