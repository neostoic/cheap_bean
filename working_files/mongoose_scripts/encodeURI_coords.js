//Node.js script for CheapBean.com, takes addresses as input, formats addresses with googlemaps geocoding API,
//then returns an array of coordinates, in addition to other parameters that may be used later in the project,
//such as neighbourhood names and short/long hand abbreviations for addresses. Will add support for mongo DB
//read/write operations, to update records with coordinates automatically.

//Write control flow here that iterates through mongo dataset, and returns each address,
//populating array 'testdata' in lieu of manually adding.

//Array holding testdata of coffee shops (Eventually populating with DB result)
testdata = ['426 College St, Toronto, ON M5T 1T3', '43 Hanna Ave #123, Toronto, ON M6K 1X1', '215 Spadina Ave Toronto, ON'];

//Google maps geocoding API parameters.
region = 'ca'; //Region parameter. (ca = Canada)
bounding_box = '-79.025345,43.591134|-79.709244,43.811540'; //Selected southeast corner below Toronto islands/scarborough, northwest markham/brampton. (GTA)
apikey = 'AIzaSyC-CIhgJ0CGbhGAOQBmW67H1p0Y_20lXGg';	//API key, geolocation and gmaps V3 enabled
sensorstatus = 'false' //Location sensor, false

//for loop that iterates through array locations and returns formatted URL for each.
for (i=0; i < testdata.length; i++){
	var address = testdata[i];
	var url = 'http://maps.googleapis.com/maps/api/geocode/json'
				+ '?sensor='+  sensorstatus
				+ '&region='+  region
				+ '&bounds='+  bounding_box
				+ '&address='+ encodeURIComponent(address);

	//NPM dependancy 'require'
	var request = require('request');
	//HTTP request to each formatted URL returned by for loop
	request(url, function (error, response, body) {
		if (!error) {
			var json = JSON.parse(body);
				//-----Fundimental-----
				var lat =				(json.results[0].geometry.location.lat); //Latitide
				var lng =				(json.results[0].geometry.location.lng); //Longitude
				var formatted_address = (json.results[0].formatted_address); //formatted_address
					//-----CONCAT-----
					var coords = [lat, lng]; //Array of formatted coordinates, Lat/Lng
					console.log(coords); //Log out to console as a demonstration

			//Function takes 3 paramenters, components is array of address components, type is key of address component to be returned
			//is_long is boolean, true or false, dependant on result.
			function getAddressComponent(components, type, is_long){
				//Setting up a loop to iterate through address components in array
				for(var n =0; n < components.length; n++){
					var component = components[n];
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

//Return latitude & longitude to mongo database with save operation under modified schema, here.