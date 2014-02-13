var ejs = require('ejs')
  , fs = require('fs')
  , express = require('express')
  , mongoose = require('mongoose');

console.log("starting");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd()

var app = express();

//Serve files out of /public directory. 
app.use(express.static(__dirname + '/public'));
app.get("/", function(request, response) {
	response.send("Node.js webserver that serves from ~/Development/Projects/08_frugallycaffeinated/ejs_learning/public");
});

//Serve /ejs, populated with test data right now.
app.get("/ejs", function(request, response) {
			
		 var path = __dirname + '/functions.ejs'
		  , str = fs.readFileSync(path, 'utf8');

		var users = [];

		users.push({ name: 'Manic Coffee', rating: 2, averageprice: '$2.27', location: 'Toronto' })
		users.push({ name: 'Dark Horse', rating: 2, averageprice: '$2.36', location: 'Toronto' })
		users.push({ name: 'The grindhouse', rating: 6, averageprice: '$2.24', location: 'Toronto' })
		users.push({ name: 'Balzacs', rating: 6, averageprice: '$2.63', location: 'Toronto' })
		//console.log(users);

		var ret = ejs.render(str, {
		  users: users,
		  filename: path
		});

	response.send(ret);
});
app.listen(port);

/* Schema for mongoose. Unsure about support for multiple nested references
================================
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
================================
var model = mongoose.model('Coffee', nest_schema)

/*