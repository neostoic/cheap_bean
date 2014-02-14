/* Mongo datbase connection
================================*/
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

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
var main = Schema({
  company_name:        String,
  website:             String,
  chain:               Boolean,
  date: {
    date_added:        Date,
    date_lastupdated: { type: Date, default: Date.now},     
  },
  rating: {
    yelp_rating:       Number,
    yelp_reviews:      Number,
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
var nest_model = mongoose.model('coffeeshop', main)

/* Data entry into model
================================*/
var manic = new nest_model({ 	
	company_name: "Balzac's Coffee Roasters",
	website: 'http://www.balzacs.com',
	chain: true,
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
		location_number: 1,
		location_name: 'Distillery District',
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
		location_number: 2,
		location_name: 'Liberty Village',
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
		location_number: 3,
		location_name: 'Ryerson Image Arts',
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
		location_number: 4,
		location_name: 'Toronto Reference Library',
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
manic.save(function (err) {
	if (err) return handleError(err);
	nest_model.findById(manic, function (err, doc) {
		if (err) return handleError(err);
		console.log(doc);
	})
})

console.log('Entry script complete'); 