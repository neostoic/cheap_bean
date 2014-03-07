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

/* ---------------------------------------------- */
// Conor's Suggestions for serving from friendly URLs using Node.js.
// Configuration details are in original email.
// Register your URL Route and assign it to a function:
app.get( '/shop/:shop_url', renderApp);

//Define the function to retreive the data and return a response:
function renderApp(req, res){

    // Get the App ID in scope ( req.params.app_id gets me the value typed in the :app_id portion of the URL. I'm using the Mongo ID field in this example, but you may want to use a different field.
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

//Serve files out of /public directory.
app.use(express.static(__dirname + '/public'));
//Serve webpage as default dir.
app.get("/", function(request, response) {

  var path = __dirname + '/public/index.ejs';
  var str = fs.readFileSync(path, 'utf8');

    //Initialize an empty array
    var users = [];

    // Conor's thoughts: Instead of putting the callback into a variable then exporting variable, export
    // function so args can be inserted externally, and it is better practice than having global variables.
    // UPADATE: Moved everything to 1 file, will deal with exportation later.

    // [5] Query operation on DB. Intermediary step is storing callback as a global var and passing to server.js that way.  
    nest_model.find({chain: 'true'}, function (err, coffeeshop) {
              if(err){
                onErr(err,callback);
                console.log('Encountered an error executing query operation.');
              }else{
                //mongoose.connection.close(); //Closes DB session
                console.log('Stored coffeeshop callback as operation, and closed mongo connection');
                //users.push(coffeeshop);
              }
              //console.log(users);
                var ret = ejs.render(str, {
                //Map var users
                users: users,
                //Set path
                filename: path
              });
              response.send(ret);
    });

  //Push test data into array (Deprecated once support for FS or direct callback passing is implimented.)
    users.push({
            company_name: "Balzac's Coffee Roasters",
            display_name: "Balzac's",
            website: "www.balzacs.com",
            chain: true,
            avg_price: 2.89,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 3.5,
              yelp_reviews: 25,
              user_rating: null
            },
            __v: 0
    });
    users.push({
            company_name: "Manic Coffee",
            display_name: "Manic",
            website: "www.maniccoffee.com",
            chain: false,
            avg_price: 2.35,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "426 College St, Toronto",
                location_name: "Bathurst and College",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 3.5,
              yelp_reviews: 25,
              user_rating: null
            },
            __v: 0    
    });
    users.push({
            company_name: "Aroma Espresso Bar",
            display_name: "Aroma",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 3.14,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "500 Bloor St W, Toronto",
                location_name: "Bathurst and Bloor",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 3.5,
              yelp_reviews: 25,
              user_rating: null
            },
            __v: 0
    });
    users.push({
            company_name: "Starbucks Coffee",
            display_name: "Starbucks",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 1.77,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "527 King St W, Toronto",
                location_name: "Fashion District",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 3,
              yelp_reviews: 30,
              user_rating: null
            },
            __v: 0
    });
    users.push({
            company_name: "Starbucks Coffee",
            display_name: "Bicerin Coffee",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 2.65,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "37 Baldwin St, Toronto",
                location_name: "Baldwin Village",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 4,
              yelp_reviews: 70,
              user_rating: null
            },
            __v: 0
    });
    users.push({
            company_name: "Starbucks Coffee",
            display_name: "Cafe Neon",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 1.75,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "241 Wallace Ave, Toronto",
                location_name: "Lansdowne",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 3.5,
              yelp_reviews: 70,
              user_rating: null
            },
            __v: 0
    });
    users.push({
            company_name: "Stadrbucks Coffee",
            display_name: "I Deal Coffee",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 1.11,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "3336 Yonge St, Toronto",
                location_name: "Yonge",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 3.5,
              yelp_reviews: 64,
              user_rating: null
            },
            __v: 0
    });
    users.push({
            company_name: "Starbucks Coffee",
            display_name: "The Grind House",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 1.79,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "281 Augusta Ave, Toronto",
                location_name: "Kensington",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 3.5,
              yelp_reviews: 86,
              user_rating: null
            },
            __v: 0
    });
    users.push({
            company_name: "Starbucks Coffee",
            display_name: "Cabin Fever Collective",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 2.18,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "1669 Bloor St. W, Toronto",
                location_name: "Bloor St.",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 4.1,
              yelp_reviews: 42,
              user_rating: null
            },
            __v: 0
    });
    users.push({
            company_name: "Starbucks Coffee",
            display_name: "Bivy",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 2.33,
            drinks: [
              {
                sizes: {
                  large: 3.1,
                  medium: 2.6,
                  small: 2.4
                },
                drink: "Americano"
              },
              {
                sizes: {
                  large: 2.8,
                  medium: 2.1,
                  small: 3.4
                },
                drink: "Cappucino"
              }
            ],
            locations: [
              {
                hours: {
                  Sunday: "8:00 AM - 7:00 PM",
                  Saturday: "7:00 AM - 8:00 PM",
                  Friday: "7:00 AM - 8:00 PM",
                  Thursday: "7:00 AM - 8:00 PM",
                  Wednesday: "7:00 AM - 8:00 PM",
                  Tuesday: "7:00 AM - 8:00 PM",
                  Monday: "7:00 AM - 8:00 PM"
                },
                phone: "(416)207-1709",
                address: "1600 Dundas St. W, Toronto",
                location_name: "Little Italy",
                location_number: 1
              },
              {
                hours: {
                  Sunday: "9:00 AM - 7:00 PM",
                  Saturday: "8:00 AM - 7:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 7:00 PM",
                  Wednesday: "7:00 AM - 7:00 PM",
                  Tuesday: "7:00 AM - 7:00 PM",
                  Monday: "7:00 AM - 7:00 PM"
                },
                phone: "(416)534-7372",
                address: "43 Hanna Ave, Toronto",
                location_name: "Liberty Village",
                location_number: 2
              },
              {
                hours: {
                  Sunday: "10:00 AM - 5:00 PM",
                  Saturday: "10:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 9:00 PM",
                  Thursday: "7:00 AM - 9:00 PM",
                  Wednesday: "7:00 AM - 9:00 PM",
                  Tuesday: "7:00 AM - 9:00 PM",
                  Monday: "7:00 AM - 9:00 PM"
                },
                phone: "(416)597-1700",
                address: "122 Bond Street, Toronto",
                location_name: "Ryerson Image Arts",
                location_number: 3
              },
              {
                hours: {
                  Sunday: "9:00 AM - 4:00 PM",
                  Saturday: "8:00 AM - 5:00 PM",
                  Friday: "7:00 AM - 7:00 PM",
                  Thursday: "7:00 AM - 8:30 PM",
                  Wednesday: "7:00 AM - 8:30 PM",
                  Tuesday: "7:00 AM - 8:30 PM",
                  Monday: "7:00 AM - 8:30 PM"
                },
                phone: "(416)922-3700",
                address: "789 Yonge Street, Toronto",
                location_name: "Toronto Reference Library",
                location_number: 4
              }
            ],
            rating: {
              yelp_rating: 2.5,
              yelp_reviews: 33,
              user_rating: null
            },
            __v: 0
    });
});

app.listen(port);
