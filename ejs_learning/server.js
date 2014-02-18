var ejs = require('ejs')
  , fs = require('fs')
  , express = require("express");

console.log("starting");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd()

var app = express();

//Serve files out of /public directory.
app.use(express.static(__dirname + '/public'));
app.get("/", function(request, response) {
  response.send("Welcome to my Node.js webserver");
});

//Serve /ejs, populated with test data right now.
app.get("/ejs", function(request, response) {

  var path = __dirname + '/functions.ejs'
  , str = fs.readFileSync(path, 'utf8');

/*
  fs.readFile('testdata.js', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    users = data; 
  });
*/

  //Initialize an empty array
  var users = [];
  //Push test data into array
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
            avg_price: 4.30,
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
            __v: 0    });
    users.push({
            company_name: "Aroma Espresso Bar",
            display_name: "Aroma",
            website: "www.aromaespresso.com",
            chain: true,
            avg_price: 7.30,
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
            avg_price: 1.30,
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
            avg_price: 1.30,
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
  //Log value of users to console
  console.log(users);

  var ret = ejs.render(str, {
  //Map var users
  users: users,
  //Set path
  filename: path
  });

  response.send(ret);
});
app.listen(port);


