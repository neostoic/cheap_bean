var ejs = require('ejs');
var fs = require('fs');
var express = require("express");
var app = express();
var mongoose = require('mongoose');

console.log("Starting Node.js");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd();

//Starts database query operation, declaring connection, schema, model. 
  // [1] DB credentials.
  // User: Heroku | Pass: 4dm1n (Will be changed upon switching to production)
  mongoose.connect('mongodb://heroku:4dm1n@troup.mongohq.com:10029/app22422589');

  // [2] DB authentication.
  console.log('Attempting authentication.');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
      console.log('Yeah were in!');
    });
  console.log('Over authentication block.');

  // [3]Declares schema.
  var main = mongoose.Schema({
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
    drinks: [drinks]  //Reference for subdocument drinks.
  });
    
    // [3a] Schema for embedded subdocument location.
    var locations = mongoose.Schema({
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

    // [3b] Schema for embedded subdocument drinks.
    var drinks = mongoose.Schema({
    drink: String,
      sizes: {
        small: Number,
        medium: Number,
        large: Number,
      }
    });

    // [4] Declares nest_model from schema.
    var nest_model = mongoose.model('coffeeshop', main);

//Serve files out of /public directory.
app.use(express.static(__dirname + '/public'));

//Conor suggested registering a second root for handling /about page, cannot do it inside of html/ejs

//Serve webpage as default dir.
app.get("/", function(request, response) {

  var path = __dirname + '/public/index.ejs';
  var str = fs.readFileSync(path, 'utf8');

    //Initialize an empty array
    var users = [];

    // [5] Query operation on DB. Intermediary step is storing callback as a global var and passing to server.js that way.  
    nest_model.find({chain: 'true'}, function (err, coffeeshop) {
      if(err){
        onErr(err,callback);
        console.log('Encountered an error executing query operation.');
      }else{
        //users.push(coffeeshop);
      }
        var ret = ejs.render(str, {
          //Map var users
          users: users,
          //Set path
          filename: path
        });
      response.send(ret);
  });
    //Support for writing contents of users array to file for testing.
    fs.writeFile("usersarray_contents", JSON.stringify(users, null, "\t"), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
    //Support for reading from file and populating users array with the data.
    fs.readFile('userarray_contents', function (err, data) {
        if(err) {
            console.log(err);
        } else {
            //Setup data callback to push directly into array users. Does positioning within file matter much if at all?
            data = users;
        }
    });
});

app.listen(port);
