// module.exports.profile = function(req,res){
//     console.log("Inside Profile Controller");
//     return res.end('<h1> here i m </h1>');
// }

//const { user } = require('../config/mongoose');
const User  = require('../models/user'); 

module.exports.profile = function(req, res){
    
    return res.render('users_profile', {
        title: 'User Profile'
    });

}

module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title: 'sign up'

    });
}

module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title: 'sign in'

    });
}

// module.exports.create = function(req,res){

//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email : req.body.email} ,function(err,user){
//         if(err){
//             console.log('error is there');
//             return;
//         }

//         if(!user){
//             User.create(req.body , function(err,user){

//                 if(err){
//                     console.log('err is there');
//                 }

//                 return res.redirect('/users/sign-in');
//            });

//         }
//         else{
//            return  res.redirect('back');
//         }

//     });

// }



module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        console.log(req.body.password+" "+req.body.confirm_password);
        console.log("password not match");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            console.log("user exist ");

            return res.redirect('back');
        }

    });
}

module.exports.createSession = function(req, res){
    // //steps to authenticate and sign in 
    // //find a user
    // User.findOne({email : req.body.email}, function(err,user){
    //     if(err){console.log('error is there'); return}
        
    //     //handle user found

    //     if(user){
    //         //if password does not matches

    //         if(user.password != req.body.password){
    //             return res.redirect('back');
    //         }
    //         //password got matched

    //             res.cookie('user_id',user.id);
    //             return res.render('users_profile',{
    //                title :'hello',
    //                 user :user
                    
    //             });
            

    //     }
    //     //user not found 

    //     else{

    //         return res.redirect('back');

    //     }
    // })
    //uper ke sare steps manual authentication vale hai 
    return res.redirect('/');


}