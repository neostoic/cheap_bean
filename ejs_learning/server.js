var ejs = require('ejs')
  , fs = require('fs')
  , express = require("express")
  , app = express()
  , mongoose = require('mongoose');

console.log("Starting Node.js");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd();

//Serve files out of /public directory.
app.use(express.static(__dirname + '/public'));
app.get("/", function(request, response) {
  response.send("Welcome to my Node.js webserver");
});

//Serve /ejs, populated with test data right now.
app.get("/ejs", function(request, response) {

  var path = __dirname + '/functions.ejs'
  , str = fs.readFileSync(path, 'utf8');

//Starts database query operation
  // [1] DB credentials.
  mongoose.connect('mongodb://heroku:admin@troup.mongohq.com:10075/app22094857');

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

    //Initialize an empty array
    var users = [];

    // Conor's thoughts: Instead of putting the callback into a variable then exporting variable, export
    // function so args can be inserted externally, and it is better practice than having global variables.
    // UPADATE: Moved everything to 1 file, will deal with exportation later.

    // [5] Query operation on DB. Intermediary step is storing callback as a global var and passing to server.js that way.  
    module.exports = nest_model.find({chain: 'true'}, function (err, coffeeshop) {
              if(err){
                onErr(err,callback);
                console.log('Encountered an error executing query operation.');
              }else{
                mongoose.connection.close(); //Closes DB session
                console.log('Stored coffeeshop callback as operation, and closed mongo connection');
                users.push(coffeeshop());
              }
            });

  //Finishes database query operation

  //Push test data into array (Deprecated once support for FS or direct callback passing is implimented.)
  /*users.push({
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
                address: "1 Trinity Street, Toronto",
                location_name: "Distillery District",
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
            avg_price: 4.35,
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
                address: "1 Trinity Street, Toronto",
                location_name: "Distillery District",
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
              yelp_rating: 4.5,
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
            avg_price: 3.32,
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
                address: "1 Trinity Street, Toronto",
                location_name: "Distillery District",
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
              yelp_rating: 7.5,
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
            avg_price: 1.37,
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
                address: "1 Trinity Street, Toronto",
                location_name: "Distillery District",
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
              yelp_rating: 5.5,
              yelp_reviews: 30,
              user_rating: null
            },
            __v: 0
    });
    users.push({
            company_name: "Starbucks Coffee",
            display_name: "The Abbott",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 1.39,
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
                address: "1 Trinity Street, Toronto",
                location_name: "Distillery District",
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
              yelp_rating: 5.5,
              yelp_reviews: 70,
              user_rating: null
            },
            __v: 0
    });
  */

  var ret = ejs.render(str, {
  //Map var users
  users: users,
  //Set path
  filename: path
  });

  response.send(ret);
});
app.listen(port);