const mongoose = require('mongoose')

const commentPollSchema = mongoose.Schema({
    userid : {
        type : String,
        required : true,
    },
    question : {
        type : String,
        required : true,
    },
    commentphoto : {
        type : String,
        default : ""
    },
    color : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true
    },
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
    ]
})


const CommentPoll = mongoose.model('CommentPoll',commentPollSchema)

module.exports = CommentPoll