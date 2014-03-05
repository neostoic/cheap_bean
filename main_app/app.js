var ejs = require('ejs');
var fs = require('fs');
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

console.log("Starting Node.js");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd();

//Declares DB connection, schema, and model. 
  // [1] DB credentials.
  // User: Heroku | Pass: 4dm1n (Will be changed upon switching to production)
  mongoose.connect('mongodb://heroku:4dm1n@troup.mongohq.com:10029/app22422589');

  // [2] DB authentication
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log('Sucessfully authenticated into database.');
  });

  // [3]Declares schema.
  var main = Schema({
    company_name:        String,
    display_name:        String,
    chain:               Boolean,
    avg_price:           Number,
    internet: {
      website:           String,
      internalurl:       String,
    },
    date: {
      date_added:       { type: Date, default: Date.now}, //Add logic to differentiate between added and lastupdated
      date_lastupdated: { type: Date, default: Date.now},     
    },
    locations: [locations],
    drinks: [drinks]
  });
    
    // [3a] Schema for embedded subdocument location.
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
        },
        rating: {
          yelp_rating: Number,
          num_reviews: Number,
          user_rating: Number,
        },
        geocoding: {
          lat:         String,
          lng:         String,
          formatted_address: String,
        }
    });

    // [3b] Schema for embedded subdocument drinks.
    var drinks = Schema({
        drink:         String,
        sizes: {
          small:     Number,
          medium:    Number,
          large:     Number,
      }
    });

    // [4] Declares nest_model from schema.
    var nest_model = mongoose.model('coffeeshop', main);

//Serve files out of /public directory.
app.use(express.static(__dirname + '/public'));

/* ---------------------------------------------- */
// Conor's Suggestions for serving from friendly URLs using Node.js.
// Configuration details are in original email.
// Register your URL Route and assign it to a function:
app.get(    '/shop/:shop_url',  renderApp);

//Define the function to retreive the data and return a response:
function renderApp(req, res){

    // Get the App ID in scope ( req.params.app_id gets me the value typed in the :app_id portion of the URL.  I'm using the Mongo ID field in this example, but you may want to use a different field.
    //var app_id = new BSON.ObjectID(req.params.app_id);
    
  // Run a DB query using the app_id to get back the data I need
        nest_model.find({'internet.internalurl':req.params.shop_url}, function(err, items) {
          console.log(items); //Example URL: localhost:5000/shop/jimmys-coffee
          //Returns items on request, just logs out to console. Next steps are to write a .ejs template that gets populated with dynamic data (Tables and the like)

        /*if(!err && items){
                // Database query returned objects, I'll pass them to my 'index' template to be rendered:
                res.render('index', { data: items});
            }else{
                // Something either went wrong with my db query or returned an empty set, handle the error here:
                res.send('Nothing here.');
            }*/
    });
}

/* ---------------------------------------------- */

//Serves about.ejs from /about path.
app.get('/about', function(req, res, next) {
  var path = __dirname + '/public/about.ejs';
  var str = fs.readFileSync(path, 'utf8');
  var ret = ejs.render(str, {
    filename: path, //Sets path to about as filename.
  });
  res.send(ret);
});

//Serves dynamic.ejs from /shop path. 
app.get('/shop', function(req, res, next) {
  var path = __dirname + '/public/dynamic.ejs';
  var str = fs.readFileSync(path, 'utf8');
  var ret = ejs.render(str, {
    filename: path, //Sets path to about as filename.
  });
  res.send(ret);
});

//Serve index.ejs as default dir.
app.get("/", function(request, response) {

  var path = __dirname + '/public/index.ejs';
  var str = fs.readFileSync(path, 'utf8');

    //Initialize an empty array to populate with callback
    var shops = [];

    // [5] Query operation on DB. Intermediary step is storing callback as a global var and passing to server.js that way.  
    nest_model.find({chain: 'false'}, function (err, coffeeshop) {
      if(err){
        onErr(err,callback);
        console.log('Encountered an error executing query operation on database.');
      }else{
        //Populating array with callback
        shops = coffeeshop;
      }
        var ret = ejs.render(str, {
          users: shops, //Map var users
          filename: path //Set path
        });
        response.send(ret);
    });
});
app.listen(port);