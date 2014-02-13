/* Mongo datbase connection
================================*/
var mongoose = require('mongoose');

// mongodb://heroku:admin@troup.mongohq.com:10075/app22094857
mongoose.connect('mongodb://heroku:admin@troup.mongohq.com:10075/app22094857');

console.log('Attempting authentication.')
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
  		console.log('Yeah were in!');
	});
console.log('Over authentication block.')

/* Declares schema
================================*/
var nest_schema = mongoose.Schema({
	company_name: String,
	website: String,
	chain: Boolean,
	date: {
		date_added: Date,
		date_lastupdated: { type: Date, default: Date.now},		
		},
	rating: {
		yelp_rating: Number,
		yelp_reviews: Number,
		user_rating: Number,
		},
	locations: {
		location_number: Number,
		location_name: String,
		address: String,
		phone: String, 
		hours: {
			Monday: String,
			Tuesday: String,
			Wednesday: String,
			Thursday: String,
			Friday: String,
			Saturday: String,
			Sunday: String,
			},
	drinks: {
		drink: String,
			sizes: {
				small: Number,
				medium: Number,
				large: Number,
				}
			}
		}
});

/* Declares model from schema
================================*/
var nest_model = mongoose.model('coffeeshop', nest_schema);