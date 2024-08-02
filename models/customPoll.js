const mongoose = require('mongoose')

const customPollSchema = mongoose.Schema({
    userid : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true,
    },
    question : {
        type : String,
        required : true,
    },
    customphoto : {
        type : String,
        default : "",
    },
    options : [
        {
            type : String,
        }
    ],
    votes : [
        {
            voterid :{
                type : String,
            },
            option : {
                type : String,
            }
        },
    ],
    comments : [
        {
            voterid : {
                type : String,
                // required : true,
            },
            comment : {
                type : String,
                // required : true,
            }
        }
    ],
    likes : [
        {
            type : String
        }
    ]
})


const customPoll = mongoose.model('CustomPoll',customPollSchema)

module.exports = customPoll