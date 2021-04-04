const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
        console.log('err is there in posts');
        return; }    
    return res.redirect('back');
});

}


module.exports.destroy = function(req,res){
    Post.findById(req.params.id, function(err,post){
        //so we need to check ki jisne post dala vahi delete kr sake koi ar nhi to uska chek lgana hai(check3) - controller level 
        if(post.user == req.user.id)  //.id means converting id into string
        {
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){

                return res.redirect('back');
            } );
        }
            else{
                return res.redirect('back');
            }
    });
}
