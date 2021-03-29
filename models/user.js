const mongoose = require('mongoose');

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
    }

} , {
    timestamps : true
});

const User  = mongoose.model('User',userSchema);

module.exports = User;

//did you resove the doubt
// no apne aap hua hoga inactivity ki vjh se