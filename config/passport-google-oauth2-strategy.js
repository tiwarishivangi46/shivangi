const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell a passport to use a new stratergy for google login 
passport.use(new googleStrategy({
    clientID: '924576493454-rm5pcc58b456pn62iajvv80caksj3i60.apps.googleusercontent.com' ,
    clientSecret:'5plGfU5Jtl_4YlCZimUQb6H_',
    callbackURL: "http://localhost:8000/users/auth/google/callback"

},

function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user)
    {
        if(err){
            console.log('error in google strategy passport',err);
            return;
        }
        console.log(profile);

        if(user){
            //if found set this request in req.user
            return done(null,user)
        }
        else{
         //if not found then create the user and create request in req.user
         User.create({
             name:profile.displayName,
             email:profile.email[0].value,
             password:crypto.randomBytes(20).toString('hex')
         },function(err,user){
             if(err){
                console.log('error in google strategy passport',err);
                return;

             }

             return done(null,user)
         });




        }





    })
}

));


module.exports = passport;