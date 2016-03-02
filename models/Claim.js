var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Claim Model
 * ==========
 */

var Claim = new keystone.List('Claim', {
	map: { name: 'eventtitle' },
	autokey: { path: 'slug', from: 'name,sponsor', unique: true }
});

Claim.add({
	name: { type: String},
	rating: {type: String},
  email: { type: String},
  amount: {type: String},
  eventtitle: {type: String},
  eventdesp: {type: String},
  eventlink: {type: String},
  taxid: {type: String},
  sponsor: {type: String},
  state: { type: String}
});

Claim.defaultColumns = 'name, state|20%, eventtitle|20%, eventdesp|20%, sponsor|20%';

Claim.register();
