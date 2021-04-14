const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
   let post =  Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
        //console.log('err is there in posts');
        req.flash('error','Error');
        return; } 
        
        if(req.xhr){
            return res.status(200),json({
                data:{
                    post:post
                },
                message :"post created!!"
            })
        }



        req.flash('success','post published!!');  
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
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message: "post deleted "
                    })
                }
                 req.flash('success','Post and associated comments deleted');
                return res.redirect('back');
            } );
        }
            else{
                req.flash('error','Error in deleting the post ')
                return res.redirect('back');
            }
    });
}
