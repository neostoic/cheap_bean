// Step 1
// Script authenticates into mongo database, finds all documents, then logs results to var find_operation.

// Authenticates into mongo database
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , mongo_auth = require('./2-schema_model.js').main
  , mongo_auth = require('./2-schema_model.js').locations
  , mongo_auth = require('./2-schema_model.js').drinks
  , nest_model = require('./2-schema_model.js').nest_model;

mongoose.connect('mongodb://heroku:4dm1n@troup.mongohq.com:10029/app22422589');

console.log('Attempting authentication.');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log("Sucessfully authenticated.");
	});

//Export authentication so next script can use it.
module.exports.db = db;
