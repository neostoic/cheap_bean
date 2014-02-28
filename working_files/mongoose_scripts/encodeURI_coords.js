//Script to authenticate into mongo DB, pull whole database, and for each coffeeshop
//with empty lat&long fields, run address through google maps geocoding APi and save
//result in database under lat&long fields.
var request = require('request');

//Array holding addresses of coffee shops (Eventually populating with DB result)
locations = ['426 College St, Toronto, ON M5T 1T3', '43 Hanna Ave #123, Toronto, ON M6K 1X1'];

//For loop that iterates through array and returns 
for (var i in locations){
	var address = locations[i];
	var url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + encodeURIComponent(address);
	return url && console.log(url);
}

request(url, function (error, response, body) {
	console.log('Requesting URL');
	if (!error && response.statuscode == 200) {
		console.log(body);
	}
});


