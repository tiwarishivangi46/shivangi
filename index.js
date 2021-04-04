const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts); //it should be upper to routes , keep in mind 
const db = require('./config/mongoose');
const session = require('express-session');  //used for session cookie
const passport  = require('passport');  // all in config
const PassportLocal = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware'); //fpr sa

app.use(sassMiddleware({
    src: './assets/scss',  //ye iske liye ki file lene kha se hai jha scss hai 
    dest: './assets/css',   //file pahauchanne kha hai ..kuki computer scss nhi jnata to scss phir css m jayega and thn computer understand karega
    debug: true,  //agr kuch error ho to samne dekh jaye terminal pr
    outputStyle: 'extended',  //code ko next fresh line se start krna hai to ...ar dursa type hpta hai jb bena spacing ke code likhna ho tb  
    prefix: '/css'  //file hsi kha vo hai ye..mtlb jha file show hogi uska path
}));

app.use(express.urlencoded()); //setting up middleware 
app.use(cookieParser()); //setting up middleware


//extract style and script from sub pages into the layout (vo bs jo layout.css ka link show ho rha tha head m uske liye hai ..taki sare pages and sub pages ke link bhi show ho )so uske liye ab layout,ejs m head m <%- style %> and same script ka mentioned hoga 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//to include assets ie css js images files
app.use(express.static( './assets'));

//try to  run it



//add view engine
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',  //apne app ka nam codeial hai esliye
    secret:'blablasomething',  //todo before hosting    //abhi kuch bhi dal diya hai 
    saveUninitialized:false,   //so this line means that if the user is not logged in ..and not wrote up the id and password ..so do we need to store the data in session cookie ...no ..to uske liye hai ye line and false kra ai isko
    resave:false, //agr ek cookie ek ar save ho gaye to bar bar thode save krna hai usko 
    cookie:{
        maxAge:(1000*60*100)  
         //itne tym ke liye cookie saved rhegi uske bad timeout ho jayega ..example bank ki website uske zayda der the login rhte ya inactivity rhte to apne aap time expire ho jata ..socokkie expire ho jate hai 
    },
    store:new mongoStore(
        {
        mongooseConnection : db,
        autoRemove:'disabled'
        },

        function(err){
            console.log(err || 'connect mongodb set-up ok')
        }
    
    )

})); //so jo encrypted form m jo id cookie m save hoti hai ov express ki vjs se hoti hai not becoz of passport.js...so uper usse ka code hai

app.use(passport.initialize()); 
app.use(passport.session());

app.use(passport.setAuthenticatedUser); //uperphle passort .initialize hoga , phir session start ..phir ye function call hoga ar passport-local...vale file m chla jayega ar usme jha  ye functiin likhaa hai vha check hoga ki agr phle se login hai and cookie present hai to phir profile page khul jayega vrna sign in mangega  

//use express router
app.use('/',require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

