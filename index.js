const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts); //it should be upper to routes , keep in mind 
const db = require('./config/mongoose');

app.use(express.urlencoded()); //setting up middleware 
app.use(cookieParser()); //setting up middleware

//extract style and script from sub pages into the layout (vo bs jo layout.css ka link show ho rha tha head m uske liye hai ..taki sare pages and sub pages ke link bhi show ho )so uske liye ab layout,ejs m head m <%- style %> and same script ka mentioned hoga 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//to include assets ie css js images files
app.use(express.static( './assets'));

//use express router
app.use('/',require('./routes'));


//add view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

