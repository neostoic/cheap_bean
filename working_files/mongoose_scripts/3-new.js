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
	company_name: "Balzac's Coffee Roasters",
	display_name: "Balzac's",
	website: 'http://www.balzacs.com',
	chain: true,
	avg_price: 2.86,
	date: {
		date_added: { type: Date, default: Date.now}, //come up with right logic
		date_lastupdated: { type: Date, default: Date.now},		
	},
	rating: {
		yelp_rating: 3.5,
		yelp_reviews: 25,
		user_rating: null,
	},
	locations: [{
		number: 1,
		name: 'Distillery District',
		address: '1 Trinity Street, Toronto',
		phone: '(416)207-1709', 
		hours: {
			Monday: '7:00 AM - 8:00 PM',
			Tuesday: '7:00 AM - 8:00 PM',
			Wednesday: '7:00 AM - 8:00 PM',
			Thursday: '7:00 AM - 8:00 PM',
			Friday: '7:00 AM - 8:00 PM',
			Saturday: '7:00 AM - 8:00 PM',
			Sunday: '8:00 AM - 7:00 PM',
		},
	},
	{
		number: 2,
		name: 'Liberty Village',
		address: '43 Hanna Ave, Toronto',
		phone: '(416)534-7372',
		hours: {
			Monday: '7:00 AM - 7:00 PM',
			Tuesday: '7:00 AM - 7:00 PM',
			Wednesday: '7:00 AM - 7:00 PM',
			Thursday: '7:00 AM - 7:00 PM',
			Friday: '7:00 AM - 7:00 PM',
			Saturday: '8:00 AM - 7:00 PM',
			Sunday: '9:00 AM - 7:00 PM',
		},
	},
	{
		number: 3,
		name: 'Ryerson Image Arts',
		address: '122 Bond Street, Toronto',
		phone: '(416)597-1700',
		hours: {
			Monday: '7:00 AM - 9:00 PM',
			Tuesday: '7:00 AM - 9:00 PM',
			Wednesday: '7:00 AM - 9:00 PM',
			Thursday: '7:00 AM - 9:00 PM',
			Friday: '7:00 AM - 9:00 PM',
			Saturday: '10:00 AM - 5:00 PM',
			Sunday: '10:00 AM - 5:00 PM',
		}
	},
	{
		number: 4,
		name: 'Toronto Reference Library',
		address: '789 Yonge Street, Toronto',
		phone: '(416)922-3700',
		hours: {
			Monday: '7:00 AM - 8:30 PM',
			Tuesday: '7:00 AM - 8:30 PM',
			Wednesday: '7:00 AM - 8:30 PM',
			Thursday: '7:00 AM - 8:30 PM',
			Friday: '7:00 AM - 7:00 PM',
			Saturday: '8:00 AM - 5:00 PM',
			Sunday: '9:00 AM - 4:00 PM',
		}
	}],
	drinks: [{
		drink: 'Americano',
			sizes: {
				small: 2.40,
				medium: 2.60,
				large: 3.10,
			}
		},
		{
		drink: 'Cappucino',
			sizes: {
				small: 3.40,
				medium: 2.10,
				large: 2.80,
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