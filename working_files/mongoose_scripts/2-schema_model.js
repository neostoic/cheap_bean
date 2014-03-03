var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , mongo_auth = require('./1-mongo_auth.js');

/* Declares schema
================================*/
var main = Schema({
  company_name:        String,
  display_name:        String,
  website:             String,
  chain:               Boolean,
  avg_price:           Number, //Most logical place to put avg_price right now
  date: {
    date_added:       { type: Date, default: Date.now}, //Add logic to differentiate between added and lastupdated
    date_lastupdated: { type: Date, default: Date.now},     
  },
  rating: {
    yelp_rating:       Number,
    num_reviews:       Number,
    user_rating:       Number,
  },
  locations: [locations],
  drinks: [drinks]
});

	/* Schema for embedded subdocument location
	================================*/
	var locations = Schema({
			number:        Number,
			name:          String,
			address:       String,
			phone:         String, 
			hours: {
				Monday:    String,
				Tuesday:   String,
				Wednesday: String,
				Thursday:  String,
				Friday:    String,
				Saturday:  String,
				Sunday:    String,
			}
			geocoding: {
				lat:       String,
				lng:       String,
				formatted_address: String,
			}
	});

	/* Schema for embedded subdocument drinks
	================================*/
	var drinks = Schema({
			drink:         String,
			sizes: {
				small:     Number,
				medium:    Number,
				large:     Number,
		}
	});

/* Declares model from schema
================================*/
var nest_model = mongoose.model('coffeeshop', main);

// Exports variables so next script can use them.
module.exports.main = main;
module.exports.locations = locations;
module.exports.drinks = drinks;
module.exports.nest_model = nest_model;