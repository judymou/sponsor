/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var gsheet = require('google-spreadsheet');
var gsheetCred = {
  client_email: process.env.gsheet_client_email,
  private_key: process.env.gsheet_private_key
};
var getSponsorSheet = new gsheet('1cRLNsftpxH5HcrFbFWDWGonN-pP-WzrTE7yybAHtkkg');
var beSponsorSheet = new gsheet('17xFEoDovki0cwDS0hpW72kGMNs-rgxMD6RIlKIcFsUk');
// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	
  app.post('/getsponsorsignup', function(req, res) {
    getSponsorSheet.useServiceAccountAuth(gsheetCred, function(err) {
      if (err) {
        console.log(err);
        res.send({success: false});
      } else {
        getSponsorSheet.addRow(1, {
           name: req.body.name,
           email: req.body.email,
           org: req.body.org || ''
        });
        res.send({success: true});
      }
    })
  });
  app.post('/besponsorsignup', function(req, res) {
    beSponsorSheet.useServiceAccountAuth(gsheetCred, function(err) {
      if (err) {
        console.log(err);
        res.send({success: false});
      } else {
        beSponsorSheet.addRow(1, {
           name: req.body.name,
           email: req.body.email,
           businessname: req.body.businessname,
           loc: req.body.loc
        });
        res.send({success: true});
      }
    })
  });
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
