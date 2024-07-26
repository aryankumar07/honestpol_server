const express = require('express')
const auth = require('../middleware/auth')
const CommentPoll = require('../models/commentPoll')
const YesNoPoll = require('../models/yesNoPoll')
const CustomPoll = require('../models/customPoll')

const PollRouter = express.Router()


PollRouter.post('/user/add-comment-poll',auth,async(req,res,next)=>{
    try{
        const {question,commentphoto,color} = req.body

        let commentpoll = new CommentPoll({
            userid : req.user,
            question,
            commentphoto,
            color
        })

        commentpoll = await commentpoll.save();

        res.status(200).json(commentpoll)
        
    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})

PollRouter.post('/user/add-yes-no-poll',auth,async(req,res,next)=>{
    try{
        const { question,color } = req.body
        let yesnopoll = new YesNoPoll({
            userid : req.user,
            question,
            color,
        })
        yesnopoll = await yesnopoll.save()
        res.status(200).json(yesnopoll)
    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})

PollRouter.post('/user/add-custom-poll',auth,async(req,res,next)=>{
    try{
        console.log('entered in custom poll')
        const {question,type,customphoto,options,color} = req.body
        let custompoll = new CustomPoll({
            userid : req.user,
            color,
            type,
            question,
            customphoto,
            options
        })
        console.log(custompoll)
        custompoll = await custompoll.save()
        res.status(200).json(custompoll)
    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})




module.exports = PollRouter;