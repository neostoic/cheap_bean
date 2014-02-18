/* This file authenticates into the mongo database running on heroku,
executes a query operation, and returns the callback as an exported variable */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//DB credentials.
mongoose.connect('mongodb://heroku:admin@troup.mongohq.com:10075/app22094857');

//DB authentication.
console.log('Attempting authentication.');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log('Yeah were in!');
	});
console.log('Over authentication block.');

// Declares schema.
var main = Schema({
  company_name: String,
  display_name: String,
  website: String,
  chain: Boolean,
  avg_price: Number, //Most logical place to put avg_price right now
  date: {
    date_added: { type: Date, default: Date.now}, //Add logic to differentiate between added and lastupdated
    date_lastupdated: { type: Date, default: Date.now},
  },
  rating: {
    yelp_rating: Number,
    num_reviews: Number,
    user_rating: Number,
  },
  locations: [locations], //Reference for subdocument locations
  drinks: [drinks]	//Reference for subdocument drinks.
});

	// Schema for embedded subdocument location.
	var locations = Schema({
	number: Number,
	name: String,
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
		}
	});

	// Schema for embedded subdocument drinks.
	var drinks = Schema({
	drink: String,
		sizes: {
			small: Number,
			medium: Number,
			large: Number,
		}
	});

// Declares nest_model from schema.
var nest_model = mongoose.model('coffeeshop', main);

//Declares var operation as global variable, then populates within scope of query.
var operation;

//Query operation on DB.
nest_model.find({chain: 'true'}, function (err, coffeeshop) {
	if(err){
		onErr(err,callback);
		console.log('Encountered an error executing query operation.');
	}else{
		mongoose.connection.close(); //Closes DB session
		console.log('Stored coffeeshop callback as operation, and closed mongo connection');
	}
});

//Conor's thoughts: Instead of putting the callback into a variable then exporting variable, export function
//so args can be inserted externally, and it is better practice than having global variables.



console.log(coffeeshop);

//Exports callback containing result of DB query.
module.exports.operation = nest_model.find();