//Script to authenticate into mongo DB, pull whole database, and for each coffeeshop
//with empty lat&long fields, run address through google maps geocoding APi and save
//result in database under lat&long fields.

/* Mongo datbase connection
================================*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongo_auth = require('./2-schema_model.js');
var nest_model = require('./2-schema_model.js').nest_model;

var uri = users.address;
var res = encoudeURI(uri);

curl "http://maps.google.com/maps/api/geocode/json?address=" + res + "&sensor=false";

/* Data entry into model
================================*/
var coffeeshop = new nest_model({
	company_name: '',
	display_name: '',
	website: '',
	chain: false,
	avg_price: 0.00,
	date: {
		date_added: { type: Date, default: Date.now}, //come up with right logic
		date_lastupdated: { type: Date, default: Date.now},		
	},
	rating: {
		yelp_rating: 0.0,
		yelp_reviews: null,
		user_rating: null,
	},
	locations: [{
		number: 1,
		name: '',
		address: '',
		phone: '', 
		hours: {
			Monday: '0:00 AM - 0:00 PM',
			Tuesday: '0:00 AM - 0:00 PM',
			Wednesday: '0:00 AM - 0:00 PM',
			Thursday: '0:00 AM - 0:00 PM',
			Friday: '0:00 AM - 0:00 PM',
			Saturday: '0:00 AM - 0:00 PM',
			Sunday: '0:00 AM - 0:00 PM',
		},
	}],
	drinks: [{
		drink: '',
			sizes: {
				small: 0.00,
				medium: 0.00,
				large: 0.00,
			}
		},
		{
		drink: '',
			sizes: {
				small: 0.00,
				medium: 0.00,
				large: 0.00,
			}		
		}]

	}
);

/* Saves model entry to mongo as document
================================*/
coffeeshop.save(function (err) {
	if (err) return handleError(err);
	nest_model.findById(coffeeshop, function (err, doc) {
		if (err) return handleError(err);
		console.log(doc);
	});
});