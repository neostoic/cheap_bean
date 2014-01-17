// app.js
//mongodb://heroku:admin@dharma.mongohq.com:10095/app21339627

var db,
    mongo     = require('mongodb'),
    Server     = mongo.Server,
    Db        = mongo.Db,
    BSON    = mongo.BSONPure;

if(!db){
    var server = new Server('dharma.mongohq.com', '10095', {auto_reconnect: true});
    db = new Db('app21339627', server);

    db.open(function(err, db) {
        db.authenticate('heroku', 'admin', function(){
            if(!err) { console.log("Connected to mongo via env vars"); }
        })
    });
}


