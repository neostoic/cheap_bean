/* Mongo datbase connection
================================*/
console.log('connecting to mongo') 
var db = mongoose.connect('mongodb://heroku:admin@troup.mongohq.com/app22094857');
	db.on('error', console.error.bind(console, 'connection error:'));
	db.connection.once('connected', function() {
		console.log("Connected to database");
	});

/* Schema for mongoose. Unsure about support for multiple nested references 
================================*/
var nest_schema = mongoose.Schema({
	company_name: String,
	website: String, 
	chain: Boolean,
	date_added: Date, 
	rating: {
		yelp_rating: Number,
		yelp_reviews: Number,
		user_rating: Number,
		},
	locations: {
		location_number: Number,
		location_name: String,
		address: String,
		phone: Number,
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
			{
			small: Number,
			medium: Number,
			large: Number,
			}
	}
});

/* Model for mongoose. Takes schema. 
================================*/
var model = mongoose.model('Coffee', nest_schema)
