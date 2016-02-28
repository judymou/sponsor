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
	
	view.on('init', function(next) {
		var q1 = keystone.list('Claim').model.find()
      .where('name', req.params.user)
      .where('state', 'approved');
		q1.exec(function(err, results) {
			locals.data.claims.approvedresults= results;
			next(err);
		});
	});
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Claim').model.find()
      .where('name', req.params.user)
      .where('state', 'pending');
		
		q.exec(function(err, results) {
			locals.data.claims.pendingresults= results;
			next(err);
		});
	});
	
	// Render the view
	view.render('user');
	
};
