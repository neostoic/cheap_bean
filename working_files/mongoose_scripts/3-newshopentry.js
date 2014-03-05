/* Mongo datbase connection
================================*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongo_auth = require('./2-schema_model.js');
var nest_model = require('./2-schema_model.js').nest_model;

/* Data entry into model
================================*/
var coffeeshop = new nest_model({
	company_name: "Jimmy's Coffee",
	display_name: "Jimmy's Coffee",
	website: 'http://www.jimmyscoffee.ca/',
	chain: true,
	avg_price: null,
	date: {				//if date lastupdated == dateadded, write lastupdated to current date 
		date_added:       { type: Date, default: Date.now},
		date_lastupdated: { type: Date, default: Date.now},		
	},
	locations: [{
		number: 1,
		name: "Kensington Market",
		address: '107 Portland St, Toronto',
		phone: '(416)901-2289', 
		hours: {
			Monday: '7:00 AM - 8:00 PM',
			Tuesday: '7:00 AM - 8:00 PM',
			Wednesday: '7:00 AM - 8:00 PM',
			Thursday: '7:00 AM - 8:00 PM',
			Friday: '7:00 AM - 8:00 PM',
			Saturday: '7:00 AM - 8:00 PM',
			Sunday: '7:00 AM - 8:00 PM',
		},
		rating: {
			yelp_rating: 4.5,
			yelp_reviews: 74,
			user_rating: null,
		},
		geocoding: {
			lat: null,
			lng: null,
			formatted_address: null,
		}
	},
	{
		number: 2,
		name: "Kensington Market",
		address: '191 Baldwin St, Toronto',
		phone: '(416)876-3855', 
		hours: {
			Monday: '7:00 AM - 8:00 PM',
			Tuesday: '7:00 AM - 8:00 PM',
			Wednesday: '7:00 AM - 8:00 PM',
			Thursday: '7:00 AM - 8:00 PM',
			Friday: '7:00 AM - 8:00 PM',
			Saturday: '7:00 AM - 8:00 PM',
			Sunday: '7:00 AM - 8:00 PM',
		},
		rating: {
			yelp_rating: 4,
			yelp_reviews: 29,
			user_rating: null,
		},
		geocoding: {
			lat: null,
			lng: null,
			formatted_address: null,
		}
	}],
	drinks: [{
		drink: 'Coffee',
			sizes: {
				small: 1.75,
				medium: 2.00,
				large: 2.25,
			}
		},
		{
		drink: 'Espresso',
			sizes: {
				small: 2.00,
				medium: null,
				large: 2.50,
			}		
		},
		{
		drink: 'Americano',
			sizes: {
				small: 2.25,
				medium: null,
				large: 2.75,
			}
		},
		{
		drink: 'Latte',
			sizes: {
				small: 3.25,
				medium: 3.50,
				large: 3.75,
			}
		},
		{
		drink: 'Cappuccino',
			sizes: {
				small: 3.25,
				medium: 3.50,
				large: 3.75,
			}
		},
		{
		drink: 'Cortado',
			sizes: {
				small: 3.00,
				medium: null,
				large: null,
			}
		},
		{
		drink: 'Mocha',
			sizes: {
				small: 4.00,
				medium: 4.55,
				large: 4.85,
			}
		},
		{
		drink: 'Hot Chocolate',
			sizes: {
				small: 2.50,
				medium: 3.00,
				large: 3.50,
			}
		},
		{
		drink: 'Chai Latte',
			sizes: {
				small: 3.25,
				medium: 3.50,
				large: 3.75,
			}
		},
		{
		drink: 'Tea',
			sizes: {
				small: null,
				medium: null,
				large: 2.00,
			}
		}]
});

/* Saves model entry to mongo as document
================================*/
coffeeshop.save(function (err) {
	if (err) return handleError(err);
	nest_model.findById(coffeeshop, function (err, doc) {
		if (err) return handleError(err);
		console.log(doc);
	});
});