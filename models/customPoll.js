const mongoose = require('mongoose')

const customPollSchema = mongoose.schema({
    userid : {
        type : String,
        required : trusted
    },
    
    color : {
        type : String,
        required : true,
    },

})


const customPoll = mongoose.model('CusromPoll',customPollSchema)

module.exports = customPoll