// Step 1
// Authenticates into mongo database
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , mongo_auth = require('./2-schema_model.js').main
  , mongo_auth = require('./2-schema_model.js').locations
  , mongo_auth = require('./2-schema_model.js').drinks
  , nest_model = require('./2-schema_model.js').nest_model;

var fs = require('fs');

// mongodb://heroku:admin@troup.mongohq.com:10075/app22094857
mongoose.connect('mongodb://heroku:admin@troup.mongohq.com:10075/app22094857');

console.log('Attempting authentication.');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log('Yeah were in!');
	});
console.log('Over authentication block.');

nest_model.find({chain: 'true'}, function (err, coffeshop) {
	if(err){
		onErr(err,callback);
	}else{
		mongoose.connection.close();
		console.log(coffeshop); //Got console.logging to work
	}
});

//Export authentication so next script can use it.
module.exports.db = db;
