;

//module.exports.home = function(req,res){
    //return res.end('<h1>express is up for codial</h1>');
    // console.log(req.cookies); 
    // console.log('i m hereeeee');  //so this is for cookies , we have downloaded the package and called the parser also , thn we send a request to cookies so we wrote this line here and thn go to inspect , and applications , thn cookies and local host ...type name and vale and thn refresh it you will see the changes in terminal and that name and vlue is shiwn in terminal 
    // res.cookie('user_id',25); // so in this line we have send the req and got the res , but if wqe want to change something like name or value thn it can be done like this 
    //hence cookies can be changed by the server and by browser both whenever needed
    //but in websites we are able to see the cokkie in encrypted form  , so we are not able to access it or change it anyway 
    //hence cookie is with us until we clear it and after that newcookie is formed 
    //more details in copy 


    
//     return res.render('home',{   //ab isme home m post display vala bhi add ho rha so see down 
//         title:"home"
//     });
// }

//module.exports.actionName = function(req,res){}

// Post.find({})   //without populating 
// .populate('user')
// .populate({
//     path : 'comments',
//     populate : {
//         path : 'user'
//     }
// })

// .exec(function(err,posts){    //so populating the code ...user ko populate krna ie db m jo uske info rakhe the sare vo nikale ..and baki uper vala code return kr diya 
//     User.find({},function(err,users){
//     return res.render('home',{
//        title: "Codeial | Home",
//         posts:posts,
//         all_users:users

//    });

// });
// });

// }

const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req, res){

    try{
         // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({})
        //.sort('createdAt') //ajax thing
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()

