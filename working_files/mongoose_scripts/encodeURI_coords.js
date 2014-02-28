//Script to authenticate into mongo DB, pull whole database, and for each coffeeshop
//with empty lat&long fields, run address through google maps geocoding APi and save
//result in database under lat&long fields.
var request = require('request');

//Array holding addresses of coffee shops (Eventually populating with DB result)
array = ['426 College St, Toronto, ON M5T 1T3', '43 Hanna Ave #123, Toronto, ON M6K 1X1', '215 Spadina Ave Toronto, ON'];


//RETURNS 1 RESULT [ERROR]
	//for loop that iterates through array locations and returns formatted URL for each.
	for (i=0; i < array.length; i++){
		var address = array[i];
		var url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + encodeURIComponent(address);
		console.log(url);
	}

request(url, function (error, response, body) {
	console.log('Requesting URL');
	if (!error && response.statuscode == 200) {
		console.log(body);
		var json = JSON.parse(body);
			console.log(json["results"]["location"]["lat"]);
			console.log(json["results"]["location"]["long"]);
	}
});

//Return latitude & longitude to mongo database with save operation