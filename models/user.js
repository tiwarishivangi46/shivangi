const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars'); //file we are going to upload is stored here


const userSchema = new mongoose.Schema({

    email:{
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true
    },

    avatar:{
        type:String   //string define kiya becoz database does not store the image it stores to path of the image

    }

} , {
    timestamps : true
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));   
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })


  //STATICS METHODS  defining publically avaloable
  userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar'); //storage m ek tym m kevl ek hi avatar jayega
  userSchema.statics.avatarPath = AVATAR_PATH;
   



const User  = mongoose.model('User',userSchema);

module.exports = User;

//did you resove the doubt
// no apne aap hua hoga inactivity ki vjh se