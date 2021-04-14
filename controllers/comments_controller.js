const Comment = require('../models/comment');
const Post = require('../models/post');
//const commentsMailer = require('../mailers/comments_mailer');


module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                //console.log('err is there in posts');
                req.flash('error','Error in adding comment');
                return; } 
                // handle error

                post.comments.push(comment);
                post.save();

                //comment =  comment.populate('user', 'name email').execPopulate();
                //commentsMailer.newComment(comment);
    



                req.flash('success','Comment Added')  //idr success ki jgh luch abc bhi likh skte the but jo bhi likho udr views lyaout se match hona chahiye
                res.redirect('/');
            });
        }

    });
}


// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//         if(comment.user == req.user.id)

//         let postId = comment.post;

//         comment.remove();   //phle to ek post hai uske andr comment ka aaray and and alg se comment a;g se hai to dono jgh se delete krna padega ....so update krke array m se chla jayega vo commemnt and remove krke niche se

//         Post.findByIdAndUpdate(postId , {$pull:{comments:req.params.id}},function(err,post){
//             return res.redirect('back');
//         });
//     }
//      else{
//          return res.redirect('back');
//      }
// });
// }



module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
               // req.flash('success','Comment Deleted');
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}
   