// module.exports.profile = function(req,res){
//     console.log("Inside Profile Controller");
//     return res.end('<h1> here i m </h1>');
// }

module.exports.profile = function(req, res){
    return res.render('users_profile', {
        title: 'User Profile'
    })
}