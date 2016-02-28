var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'business';
	locals.data = {
		claims: [],
	  post: [],
    businessName: req.params.business.replace(/-/g, ' '),
  };
	
	view.on('init', function(next) {
		var q1 = keystone.list('Claim').model.find()
      .where('sponsor', req.params.business)
      .where('state', 'approved');
		q1.exec(function(err, results) {
			locals.data.claims.approvedresults= results;
			next(err);
		});
	});
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Claim').model.find()
      .where('sponsor', req.params.business)
      .where('state', 'pending');
		
		q.exec(function(err, results) {
			locals.data.claims.pendingresults= results;
			next(err);
		});
	});
	
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.findOne()
      .where('slug', req.params.business);
		
		q.exec(function(err, result) {
			locals.data.post= result;
			next(err);
		});
	});

  // Render the view
	view.render('business');
	
};
