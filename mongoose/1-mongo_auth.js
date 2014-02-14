// Step 1
// Authenticates into mongo database

var mongoose = require('mongoose');

// mongodb://heroku:admin@troup.mongohq.com:10075/app22094857
mongoose.connect('mongodb://heroku:admin@troup.mongohq.com:10075/app22094857');

console.log('Attempting authentication.')
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
  		console.log('Yeah were in!');
	});
console.log('Over authentication block.')

//Export authentication so next script can use it.
module.exports.db = db;

