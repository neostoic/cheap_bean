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

// mongojs database connect
	var databaseUrl = "heroku:admin@troup.mongohq.com/app22094857"; // "username:password@example.com/mydb"
	var collections = ["shops"]
var db = require("mongojs").connect(databaseUrl, collections);

// Find all documents in a collection and store as returnall.
var returnall = db.shops.find();

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


