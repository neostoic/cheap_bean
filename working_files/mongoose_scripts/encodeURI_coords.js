//Script to authenticate into mongo DB, pull whole database, and for each coffeeshop
//with empty lat&long fields, run address through google maps geocoding APi and save
//result in database under lat&long fields.
var request = require('request');

//Array holding addresses of coffee shops (Eventually populating with DB result)
array = ['426 College St, Toronto, ON M5T 1T3', '43 Hanna Ave #123, Toronto, ON M6K 1X1', '215 Spadina Ave Toronto, ON'];


//RETURNS 1 RESULT [ERROR]
	//for loop that iterates through array locations and returns formatted URL for each.
	for (i=0; i in array; i++){
		var address = array[i];
		var url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + encodeURIComponent(address);
		console.log(url);
		return url;
	}
//http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=426%20College%20St%2C%20Toronto%2C%20ON%20M5T%201T3

//RETURNS 3 concatenated results [ERROR]
	//forEach loop that iterates through array locations and returns formatted URL for each.
	var address = array;
	address.forEach(function(url) {
		url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + encodeURIComponent(address);
		console.log(url);
		return url;
	});
//http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=426%20College%20St%2C%20Toronto%2C%20ON%20M5T%201T3%2C43%20Hanna%20Ave%20%23123%2C%20Toronto%2C%20ON%20M6K%201X1%2C215%20Spadina%20Ave%20Toronto%2C%20ON
//http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=426%20College%20St%2C%20Toronto%2C%20ON%20M5T%201T3%2C43%20Hanna%20Ave%20%23123%2C%20Toronto%2C%20ON%20M6K%201X1%2C215%20Spadina%20Ave%20Toronto%2C%20ON
//http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=426%20College%20St%2C%20Toronto%2C%20ON%20M5T%201T3%2C43%20Hanna%20Ave%20%23123%2C%20Toronto%2C%20ON%20M6K%201X1%2C215%20Spadina%20Ave%20Toronto%2C%20ON

/*
request(url, function (error, response, body) {
	console.log('Requesting URL');
	if (!error && response.statuscode == 200) {
		console.log(body);
	}
});
*/

var json = JSON.parse(body);

//Parsing JSON output
console.log(json["results"]["location"]["lat"]);
console.log(json["results"]["location"]["long"]);

//Return latitude & longitude to mongo database with save operation