var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	coverPicture: { type: String},
	address: { type: String, required: true, default: 'San Francisco, CA' },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: {
		brief: { type: String },
		extended: { type: String}
	},
  option1: {
    picture: {type: String},
    description: {type: String},
    price: {type: Number},
    amount: {type: Number},
    claimedAmount: {type: Number},
    numPendingRequest: {type: Number}
  },
  option2: {
    picture: {type: String},
    description: {type: String},
    price: {type: Number},
    amount: {type: Number},
    claimedAmount: {type: Number},
    numPendingRequest: {type: Number}
  },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	lat: {type: String, default: '0'},
	lng: {type: String, default: '0'}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
