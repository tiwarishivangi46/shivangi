// const { getMaxListeners } = require('../config/mongoose');
// const nodeMailer = require('../config/nodemailer');

// //another way of exporting a method 
// exports.newComment = (comment) => {
//     console.log('inside new comments mailer');


//     nodeMailer.transporter.sendMail({
//         from:tiwarishivangi46@gmail.com,
//         to: comment.user.email,
//         subject: "New Comment Published !!",
//         html: '<h1> Yup, your comment is published !! </h1>'
//     },(err,info) => {
//         if(err){
//             console.log("error in sending mail",err);
//             return;
//         }

//         console.log('message sent',info);
//         return;
    




//     });

// }

const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
       from: 'tiwarishivangi46@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: '<h1>Yup, your comment is now published!</h1>' 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}