// const passport = require('passport');   //setting up the password.js

// const LocalStrategy = require('passport-local').Strategy;    //setting up the local stratergy into the passport.js

// const User = require('../models/user');    //using User from config folder


// // authentication using passport(find a user and authenticate them)
// passport.use(new LocalStrategy({         //using localstratergy from package 
//         usernameField: 'email'    //email ko idr usernamefield hi bola jata hai 
//     },
//     function(email, password, done){
//         // find a user and establish the identity
//         User.findOne({email: email}, function(err, user)  {
//             if (err){
//                 console.log('Error in finding user --> Passport');
//                 return done(err);
//             }
//             //agr user nhi hai ya ..jo password dalavo galat hai 

//             if (!user || user.password != password){
//                 console.log('Invalid Username/Password');
//                 return done(null, false);    //false return krna hai
//             }

//             return done(null, user);   //ar agr sab thik rha user id password ka sab to user enter ho gya
//         });
//     }


// ));


// // serializing the user to decide which key is to be kept in the cookies (ye mainly tb hai jb authenticate ho gya user, ar ab we will  see that konse propertyie id cookies m save hogi   )
// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });



// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('Error in finding user --> Passport');
//             return done(err);
//         } 

//         return done(null, user);
//     });
// });

// passport.setAuthentication = function(req,res,next){  //check if the user is authenticated then pass on the request to next controller action 
//     if(req.isAuthenticated()){
//         return next();    //agr user authenticated hai tabhi usko profile photo show hoga
//     }

//     //if the user is not signed in
//     return res.redirect('/users/sign-in');
// }


// passport.setAuthenticatedUser= function(req,res,next){
//     if(req.isAuthenticated()){
//         res.locals.user = res.user;//req user contains the currrent sign in user from the session cookie and we are just sending in to the locals for the views
    
//     }

//     next();
// }

// module.exports=passport;



const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;