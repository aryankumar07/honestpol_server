const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name :{
        type : String,
        require : true,
    },
    bio : {
        type:String,
        default : '',
    },
    posts : [
        {
            type : String
        }
    ],
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    cid : {
        type : String,
        required : true
    },
    votes : [
        {
            type : String
        }
    ],
    status : {
        type : String,
        default : 'First Timer'
    },
    profilepic : {
        type : String,
        default : '',
    }
});

const User = mongoose.model('User',userSchema)

module.exports = User