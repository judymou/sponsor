var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'letter';
	locals.data = {
		claims: [],
  };
	
	view.on('init', function(next) {
		var q1 = keystone.list('Claim').model.find()
      .where('slug', req.params.claim)
		q1.exec(function(err, results) {
			console.log(results);
      locals.data.claims.results= results;
			next(err);
		});
	});
	
	// Render the view
	view.render('letter');
	
};
