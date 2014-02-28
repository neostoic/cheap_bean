//Script to authenticate into mongo DB, pull whole database, and for each coffeeshop
//with empty lat&long fields, run address through google maps geocoding APi and save
//result in database under lat&long fields.
var request = require('request');

//Write control flow here that iterates through mongo dataset, and returns each address, populating array 'addresses'

//Array holding addresses of coffee shops (Eventually populating with DB result)
addresses = ['426 College St, Toronto, ON M5T 1T3', '43 Hanna Ave #123, Toronto, ON M6K 1X1', '215 Spadina Ave Toronto, ON'];

//Bounding box, Southest|Northeast coords. Restricts results to only Toronto
bounds = "-79.025345,43.591134|-79.709244,43.811540"; //Selected southeast corner below torontoislands/scarborough, northwest markham/brampton

//for loop that iterates through addresses locations and returns formatted URL for each.
for (i=0; i < addresses.length; i++){
	var address = addresses[i];
	var url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + encodeURIComponent(address);
	console.log(url);
}

request(url, function (error, response, body) {
	if (!error) {
		var json = JSON.parse(body);
			//-----COORDS---------
			var lat =				(json.results[0].geometry.location.lat); //Latitide
			var lng =				(json.results[0].geometry.location.lng); //Longitude

			//-----SPECIFICS------ Parsing API result.
			var formatted_address = (json.results[0].formatted_address); //formatted_address
			var street_number = 	(json.results[0].address_components[0].short_name); //street_number
			var street_name = 		(json.results[0].address_components[1].short_name); //'route'
			var neighbourhood = 	(json.results[0].address_components[2].short_name); //
			var city = 				(json.results[0].address_components[4].short_name);
			var provence = 			(json.results[0].address_components[6].short_name);
			var country =			(json.results[0].address_components[7].long_name); //Country 'Canada'

			var coords = [lat, lng]; //Array of formatted coordinates, Lat/Lng
			console.log(coords);
	}
});

//Return latitude & longitude to mongo database with save operation under modified schema, here!