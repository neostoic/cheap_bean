//Friendly URL example done by Conor. Adapt to app.js. 

// Register your URL Route and assign it to a function:
app.get(    '/app/:app_id',  renderApp);

//Define the function to retreive the data and return a response:
function renderApp(req, res){

    // Get the App ID in scope ( req.params.app_id gets me the value typed in the :app_id portion of the URL.  I'm using the Mongo ID field in this example, but you may want to use a different field.
    var app_id = new BSON.ObjectID(req.params.app_id);
    
  // Run a DB query using the app_id to get back the data I need
  db.collection('apps', function(err, collection) {
        collection.find({'_id':app_id}).toArray(function(err, items) {
            
        if(!err && items){
                // Database query returned objects, I'll pass them to my 'index' template to be rendered:
                res.render('index', { data: items})
            }else{
                // Something either went wrong with my db query or returned an empty set, handle the error here:
                res.send('Nothing here.');
            }
        });
    });
}