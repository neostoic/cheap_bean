//Node.js script for CheapBean.com, takes addresses as input, formats addresses with googlemaps geocoding API,
//then returns an array of coordinates, in addition to other parameters that may be used later in the project,
//such as neighbourhood names and short/long hand abbreviations for addresses. Will add support for mongo DB
//read/write operations, to update records with coordinates automatically.

//Write control flow here that iterates through mongo dataset, and returns each address,
//populating array 'shop' in lieu of manually adding.

//Requires DB authentication code, Heroku.
var db_connection = require('./1-mongo_auth.js').db;
var mongo_auth = require('./2-schema_model.js');
var nest_model = require('./2-schema_model.js').nest_model;

//Step1: Query the database for all documents that do not contain geocoding data. 
//Write logic here to iterate through all available records that satisfy condition in query.
nest_model.find({ geocoding: { $exists: false } }, onResults);
	//Takes results returned by DB query, and iterates through them individually.
	function onResults (err, documents) {
		//Initialize an empty array for testing.
		var data = documents;
		//For each document returned by query, log to console.
		for (i=0; i<data.length; i++) {
			var shop = data[i];
			console.log(shop);
			//console.log(shop.locations[i].address)
			geocodeLocation([shop.locations[i].address]);
		}
	}

//Step2: Run the output of query operation through google maps geocoding API. Index and pass to next function.
function geocodeLocation(shop){
	//Google maps geocoding API parameters.
	region = 'ca'; //Region parameter. (ca = Canada)
	bounding_box = '-79.025345,43.591134|-79.709244,43.811540'; //Selected SE: corner below Toronto Islands/Scarborough, NW: Markham/Brampton. (GTA)
	apikey = 'AIzaSyC-CIhgJ0CGbhGAOQBmW67H1p0Y_20lXGg';	//API key, geolocation and gmaps V3 enabled
	sensorstatus = 'false'; //Location sensor, set to false
	//for loop that iterates through array locations and returns formatted URL for each.
	for (i=0; i < shop.length; i++){
		var address = shop[i];
		var url = 'http://maps.googleapis.com/maps/api/geocode/json'
					+ '?sensor='  +  sensorstatus
					+ '&region='  +  region
					+ '&bounds='  +  bounding_box
					//+ '&key='     +  apikey
					+ '&address=' +  encodeURIComponent(address);
		//NPM dependancy 'require'.
		var request = require('request');
		//HTTP request to each formatted URL returned by for loop, using npm module: request
		request(url, function (error, response, body) {
			if (!error) {
				var json = JSON.parse(body);
					//-----Fundimental-----
					var lat =				(json.results[0].geometry.location.lat); //Latitide
					var lng =				(json.results[0].geometry.location.lng); //Longitude
					var formatted_address = (json.results[0].formatted_address); //formatted_address
					var neighbourhood = (json.results[0].geometry)
					var street_name = getAddressComponent(json.results[0].address_components, 'route', true);
						//-----CONCAT-----
						var coords = [lat, lng]; //Array of formatted coordinates, Lat/Lng
						//console.log(coords); //Log out to console as a demonstration
						//console.log(body); //Log out contents of body (Full JSON document from query.)

				//Function takes 3 paramenters, components is array of address components, type is key of address component to be returned
				//is_long is boolean, true or false, dependant on result (Short is preferable for user display, long for standardization)
				function getAddressComponent(components, type, is_long){
					//Setting up a loop to iterate through address components in array
					for(var n=0; n < components.length; n++){
						var component = components[n];
						//Iterating through types array in component
						for(var j = 0; j < component.types.length; j++){
							if( component.types[j] == type){ //Checking to see if type that we want is in this array, if so returning long or short name based on boolean.
								return (is_long) ? component.long_name : component.short_name;
							}
						}
					}
				}

				//Exports variables so next function, writedatabase, can use them. 
				writedatabase(shop, lat, lng, formatted_address, neighbourhood);
			}
		});
	}
}

//Step3: Write results back to database. (Set upsert to false, preventing new records from being created.)
function writedatabase(shop, lat, lng, formatted_address, neighbourhood){
    var locations = shop.locations;
	// alter the locations array 
	console.log(locations);
	//Still giving me an unexpected token error, troubleshoot syntax, look at examples on mongoose site.
	//nest_model.update({ "_id": shop._id }, {$set: {locations: locations}, { upsert: false });
}
