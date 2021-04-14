// const nodemailer = require("nodemailer");
// const ejs = require('ejs');
// const path = require('path');

// let transporter = nodemailer.createTransport({
//     service: 'gmail',  //becoz we are using gmail service
//     host: 'smtp.gmail.com',   //smtp se mail jate hai  . interaction with gmail we use smtp server
//     port: 587,  //SMTP over SSL/TLS works over port   (only smtp port = 25)
//     secure: false,
//     auth: {
//         user: 'codeial',
//         pass: 'shivangitiwari'
//     }
// });
// let renderTemplate = (data, relativePath) => {
//     let mailHTML;
//     ejs.renderFile(
//         path.join(__dirname, '../views/mailers', relativePath),   //udr ejs file m jo template banaywnge vesa hi sabko jayga mail to vo 
//         data,
//         function(err, template){
//          if (err){console.log('error in rendering template'); return}   
         
//          mailHTML = template; 
//         }
//     )

//     return mailHTML;
// }


// module.exports = {
//     transporter: transporter,
//     renderTemplate: renderTemplate
//     //uper do properties define ke unko export bhi krna hai so yha domo mention kiye hai 
// }

















