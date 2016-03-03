var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'report';
	locals.data = {
		claims: [],
  };
	
	view.on('init', function(next) {
	});
	
	// Render the view
	view.render('report');
	
};
