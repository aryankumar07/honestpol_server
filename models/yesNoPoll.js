const mongoose = require('mongoose')

const YesNoPollSchema = mongoose.Schema({
    userid : {
        type : String,
        required : true,
    },
    question : {
        type : String,
        required : true,
    },
    color : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true
    },
    yesvotes : [
        {
            type : String
        }
    ],
    novotes : [
        {
            type : String
        }
    ],
    likes : [
        {
            type : String
        }
    ]
})


const YesNoPoll = mongoose.model('YesNoPoll',YesNoPollSchema)

module.exports = YesNoPoll