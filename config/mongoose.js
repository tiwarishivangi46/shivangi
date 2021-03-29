const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');  //there are three types of envronment -testing prodcution and development

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));  //if any  error strikes 


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');   //if db is set up successfully 
});


module.exports = db;