




// const User  = require('../models/user'); 

// module.exports.profile = function(req, res){
//  User.findById(req.params.id,function(err,user){
//     return res.render('users_profile', {
//         title: 'User Profile',
//         profile_user: user
//     });


//  }); 







// //module.exports.update = async function(req,res){



// // if(req.user.id == req.params.id){      //update vale ko async m change kiya 
// //     try{
// //         let user = await findById(req.params.id);
// //         User.uploadedAvatar(req,res,function(err){
// //             if(err){
// //                 console.log('*****multer ERROR:',err);   //vo udr form m ab mutitasking ho gya to esliye idr multer se file name dekha rhe udr 
// //             }
           
// //             user.name = req.body.name;
// //             user.email = req.body.email; //vo multi ho gya tha to ..leta nhi mail and name to yha bhi likha
// //             if(req.file){
// //                 user.avatar = User.avatarPath + '/' + req.file.filename; //jis name se save hoga vo hai ye
// //             }
// //             user.save();
// //             return res.redirect('back');
// //         })

// //     }
// //     catch(err){
// //         //req.flash('error','err')
// //        // return res.redirect('back');
// //        console.log('err', err);


// //     }
// // }
// // else{
// //     req.flash('error', 'unauthorized');
// //     return res.status(401).send('Unauthorized');

// // }


// // }

// module.exports.update = async function(req, res){
    
//     try{
//         let user = await User.findById(req.params.id);
//         User.uploadedAvatar(req,res,function(err){
//             if(err){console.log('multer error',err);}
//             //console.log(req.file);
//             user.name = req.body.name;
//             user.email = req.body.email;

//             if(req.file){

//                 if(user.avatar){
//                     fs.unlinkSync(path.join(__dirname,'..',user.avatar));
//                 }

//                 //this is  saving the pata of uploaded file into the avatar field in the user
//                 user.avatar = User.avatarPath+'/'+req.file.filename;
//             }
//             user.save();
//             return res.redirect('back');
//         });


//     }catch(err){
//         console.log(err);
//     }
// }

// module.exports.signup = function(req,res){
//     return res.render('user_sign_up',{
//         title: 'sign up'

//     });   
// }

// module.exports.signin = function(req,res){
//     return res.render('user_sign_in',{
//         title: 'sign in'

//     });
// }


// module.exports.create = function(req, res){
//     if (req.body.password != req.body.confirm_password){
//         console.log(req.body.password+" "+req.body.confirm_password);
//         console.log("password not match");
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing up'); return}

//         if (!user){
//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             console.log("user exist ");

//             return res.redirect('back');
//         }

//     });
// }


// module.exports.createSession = function(req, res){
    

//     req.flash('success','logged in successfully'); //uper flash require kr liya. .phir yha callkra ..but ye to bs request hai so response tk isko transfer krna hai so we will use middleware
//     return res.redirect('/');


// }

// }

const User = require('../models/user');
const fs = require('fs');
const path = require('path');
// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}


module.exports.update = async function(req, res){
    
    try{
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log('multer error',err);}
            //console.log(req.file);
            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){

                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }

                //this is  saving the pata of uploaded file into the avatar field in the user
                user.avatar = User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            return res.redirect('back');
        });


    }catch(err){
        console.log(err);
    }
}


// render the sign up page
module.exports.signup = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signin = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}







