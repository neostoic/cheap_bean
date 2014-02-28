//Script to authenticate into mongo DB, pull whole database, and for each coffeeshop
//with empty lat&long fields, run address through google maps geocoding APi and save
//result in database under lat&long fields.
var request = require('request');

//Write control flow here that iterates through mongo dataset, and returns each address, populating array 'addresses'

//Array holding addresses of coffee shops (Eventually populating with DB result)
addresses = ['426 College St, Toronto, ON M5T 1T3', '43 Hanna Ave #123, Toronto, ON M6K 1X1', '215 Spadina Ave Toronto, ON'];

//Google maps geocoding API parameters.
	//Region parameter. (ca = Canada)
		region = 'ca';
	//Bounding box, Southest|Northeast coords. Restricts results to GTA only.
	//Selected southeast corner below torontoislands/scarborough, northwest markham/brampton.
		bounds = '-79.025345,43.591134|-79.709244,43.811540'; 
	//API key, geolocation and gmaps V3 enabled
		apikey = 'AIzaSyC-CIhgJ0CGbhGAOQBmW67H1p0Y_20lXGg';
	//Location sensor
		sensorstatus = 'false'

//for loop that iterates through addresses locations and returns formatted URL for each.
for (i=0; i < addresses.length; i++){
	var address = addresses[i];
	var url = 'http://maps.googleapis.com/maps/api/geocode/json'
				+ '?sensor='+  sensorstatus
				+ '&region='+  region
				+ '&bounds='+  bounds
				+ '&address='+ encodeURIComponent(address);
	//console.log(url);

	//Makes http request to each URL returned by for loop.
	request(url, function (error, response, body) {
		if (!error) {
			var json = JSON.parse(body);
				//-----COORDS---------
				var lat =				(json.results[0].geometry.location.lat); //Latitide
				var lng =				(json.results[0].geometry.location.lng); //Longitude
				var formatted_address = (json.results[0].formatted_address); //formatted_address

				//-----SPECIFICS------ Parsing API result.
				var street_number = 	(json.results[0].address_components[0].short_name); //street_number
				var street_name = 		(json.results[0].address_components[1].short_name); //'route'
				var neighbourhood = 	(json.results[0].address_components[2].short_name); //'neighbourhood'
				var city = 				(json.results[0].address_components[4].short_name);
				var provence = 			(json.results[0].address_components[6].short_name);
				var country =			(json.results[0].address_components[7].long_name); //Country 'Canada'

					//-----CONCAT--------- Concatinated results
					var coords = [lat, lng]; //Array of formatted coordinates, Lat/Lng
					var address = street_number +" "+ street_name +", "+ neighbourhood +", "+ city +", "+ provence +", "+ country;
					console.log(coords);

			//Conor suggested writing flow control that iterates through address_components, searching by 
			//types. For example, if 'types' = locality, assume city name, as indexing using positioning
			//is not repeatable and reliable.


			// Function takes 3 paramenters, components is array of address components, type is key of address component to be returned
			// is_long is boolean, true or false, dependant on result.
			function getAddressComponent(components, type, is_long){
				//Setting up a loop to iterate through address components in array
				for(var i =0; i < components.length; i++){
					var component = components[i];
					//Iterating through types array in component
					for(var j = 0; j < component.types.length; j++){
						if( component.types[j] == type){ //Checking to see if type that we want is in this array, if so returning long or short name based on boolean.
							return (is_long) ? component.long_name : component.short_name;
						}
					}
				}

			}
			//querying street name, and passing paramers into function getAddressComponent. True | returns long form.			
			var street_name = getAddressComponent(json.results[0].address_components, 'route', true);
			console.log(street_name);
		}
	});
}

//Return latitude & longitude to mongo database with save operation under modified schema, here!