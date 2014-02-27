// Step 1
// Script authenticates into mongo database, finds all documents, then logs results to var find_operation.

// Authenticates into mongo database
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , mongo_auth = require('./2-schema_model.js').main
  , mongo_auth = require('./2-schema_model.js').locations
  , mongo_auth = require('./2-schema_model.js').drinks
  , nest_model = require('./2-schema_model.js').nest_model;

var fs = require('fs');

mongoose.connect('mongodb://heroku:4dm1n@troup.mongohq.com:10029/app22422589');

console.log('Attempting authentication.');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log('Yeah were in!');
	});
console.log('Over authentication block.');

/*var operation;
nest_model.find({chain: 'true'}, function (err, coffeeshop) {
	if(err){
		onErr(err,callback);
	}else{
		mongoose.connection.close();
		operation = coffeeshop;
		console.log('Stored coffeeshop callback as operation, and closed mongo connection');
	}
});
*/
//Export authentication so next script can use it.
module.exports.db = db;
//Export data from find operation.
//module.exports.operation = operation; 
