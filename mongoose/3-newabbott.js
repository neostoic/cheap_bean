/* Mongo datbase connection
================================*/
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , mongo_auth = require('./2-schema_model.js')
  , nest_model = require('./2-schema_model.js').nest_model;

  console.log(mongo_auth);

/* Data entry into model
================================*/
var coffeeshop = new nest_model({
	company_name: "The Abbott",
	display_name: "The Abbott",
	website: 'http://www.theabbott.ca/',
	chain: false,
	avg_price: null,
	date: {
		date_added: { type: Date, default: Date.now}, //come up with right logic
		date_lastupdated: { type: Date, default: Date.now},		
	},
	rating: {
		yelp_rating: 4,
		yelp_reviews: 15,
		user_rating: null,
	},
	locations: [{
		number: 1,
		name: 'The Abbott - Parkdale',
		address: '99 Spencer Ave, Toronto',
		phone: '(416)876-3855', 
		hours: {
			Monday: '6:30 AM - 7:00 PM',
			Tuesday: '6:30 AM - 7:00 PM',
			Wednesday: '6:30 AM - 7:00 PM',
			Thursday: '6:30 AM - 7:00 PM',
			Friday: '6:30 AM - 7:00 PM',
			Saturday: '7:00 AM - 7:00 PM',
			Sunday: '7:00 AM - 7:00 PM',
		},
	}],
	drinks: [{
		drink: 'Coffee',
			sizes: {
				small: 1.75,
				medium: null,
				large: 2.25,
			}
		},
		{
		drink: 'Espresso',
			sizes: {
				small: 1.75,
				medium: null,
				large: 2.50,
			}		
		},
		{
		drink: 'Americano',
			sizes: {
				small: 2.00,
				medium: null,
				large: 2.50,
			}
		},
		{
		drink: 'Latte',
			sizes: {
				small: 3.25,
				medium: null,
				large: 4.00,
			}
		},
		{
		drink: 'Cappuccino',
			sizes: {
				small: 3.25,
				medium: null,
				large: 4.00,
			}
		},
		{
		drink: 'Macchiato',
			sizes: {
				small: 2.00,
				medium: null,
				large: 2.75,
			}
		},
		{
		drink: 'Hot Chocolate',
			sizes: {
				small: 3.25,
				medium: null,
				large: 4.00,
			}
		},
		{
		drink: 'Apple Cider',
			sizes: {
				small: 2.50,
				medium: null,
				large: 3.50,
			}
		},
		{
		drink: 'Chai Latte',
			sizes: {
				small: 3.25,
				medium: null,
				large: 4.00,
			}
		},
		{
		drink: 'Tea',
			sizes: {
				small: null,
				medium: null,
				large: 2.50,
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