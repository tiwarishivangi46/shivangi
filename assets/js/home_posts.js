//adding ajax

{
    let createPost = function(){
        let newPostForm = $('new-post-form');   //form created
        newPostForm.submit(function(e){   //e-event which is used for creting event i.e if we try to submit nothing will happen becozwe want to manually submit it
            e.preventDefault();

            $.ajax({   //submit manually using ajax
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),  //send in the data we needd to post ..this serialize the form data into json format ie key and value -content-key and value - value filled in form
                success: function(data){ //receive the data and error if there 
                    // console.log(data); 
                    let newPost = newPostDom(data.data.post) ;  //to jo post dekhana hai vo dala 
                    $('#posts-list-container>ul').prepend(newPost);   //sabse uper show krne ke liye ..append se niche hote hai
                    deletePost($(' .delete-post-button',newPost)); //niche delete ka request banakr yha uper ye add krna hai    new post le andr hai delete-post button ..so now we are just setting te object
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        }) //when we have submitted we will receive all this in post controller 


    }

    let newPostDom = function(post){
        return $(`
        <li id= "post-${post._id }">
        <p>
           {/* <% if (locals.user && locals.user.id == post.user.id){ %>   </p> */}

                {/* <!-- view leve - check1 - jisne post kiya doubt and jisne and jo user sign in hai usko hi deletekrne ka option dekhegaa --> */}
            {/* kuki creTE HUI HAI TABHI DELETE HUI HAI TO HARTADE YE LINE</p> */}
            <small>
                <a class = "delete-post-button" href="/posts/destroy/${ post._id }">X</a>
            </small>
           
            ${post.content}
            <br>
            <small>
                ${ post.user.name }
            </small>
        </p>
        <div class="post-comments">
              {/* <% if (locals.user){ %> user is already sign in and created the post */}
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${ post._id }" >
                    <input type="submit" value="Add Comment">
                </form>
    
           
    
            <div class="post-comments-list">
                <ul id="post-comments-<%= post._id %>">
                   
                </ul>
            </div>
        </div>
        
    </li> ` )
    }


    let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}` ).remove(); //jis post ko remove krna hai ..usse ka udr se link liya i.e id
                
            },error: function(error){
                console.log(error.responseText);
            }
        })

    })

}
    createPost();
}