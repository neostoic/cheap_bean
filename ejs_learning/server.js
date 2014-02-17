var ejs = require('ejs')
  , fs = require('fs')
  , express = require('express')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , mongo_auth = require('../mongoose/2-schema_model.js').db
  , db_search = require('../mongoose/1-mongo_auth.js').coffeeshop
  , nest_model = require('../mongoose/2-schema_model.js').nest_model
  , app = express;


console.log("starting");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd()

//Serve files out of /public directory. 
app.use(express.static(__dirname + '/public'));
app.get("/", function(request, response) {
	response.send("Node.js webserver that serves from ~/Development/Projects/08_frugallycaffeinated/ejs_learning/public");
});

//Serve /ejs, populated with test data right now.
app.get("/ejs", function(request, response) {	
		var path = __dirname + '/functions.ejs'
		, str = fs.readFileSync(path, 'utf8');



			/* Declares schemas
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

			var coffeeshop = mongoose.model('coffeeshop', main);	

			//Authenticates into mongo database.
			mongoose.connect('mongodb://heroku:admin@troup.mongohq.com:10075/app22094857');
			console.log('Attempting authentication.');
				var db = mongoose.connection;
				db.on('error', console.error.bind(console, 'connection error:'));
				db.once('open', function callback () {
					console.log('Yeah were in!');
			});
			console.log('Over authentication block.');

			//Finds all documents with 'chain: true', and stores callback as var operation.
			nest_model.find({chain: 'true'}, function (err, coffeeshop) {
				if(err){
					onErr(err,callback);
				}else{
					mongoose.connection.close();
					operation = coffeeshop;
					console.log('Stored coffeeshop callback as var operation, and closed mongo DB connection');
				}
			});


		db_search = users;
		console.log(users);

		var ret = ejs.render(str, {
			users: users,
			filename: path
		});

	response.send(ret);
});
app.listen(port);