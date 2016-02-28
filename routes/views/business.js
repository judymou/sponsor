var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'business';
	locals.data = {
		claims: [],
	};
	
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Claim').model.find()
      .where('sponsor', req.params.business);
		
		q.exec(function(err, results) {
      console.log('here');
      console.log(results);
			locals.data.claims.results= results;
			next(err);
		});
	});
	
	// Render the view
	view.render('business');
	
};
