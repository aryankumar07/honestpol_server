const express = require('express')
const auth = require('../middleware/auth')
const CommentPoll = require('../models/commentPoll')
const YnPoll = require('../models/yesNoPoll')
const customPoll = require('../models/customPoll')
const getPollRouter = express.Router();

getPollRouter.get('/home/get_comment_poll',auth,async(req,res,next)=>{
   try{
    const comments = await CommentPoll.find()
    res.status(200).json(comments)
   }catch(e){
    return res.status(500).json({
        error : e.message
    })
   }
})

getPollRouter.get('/home/get_ynpoll',async(req,res,next)=>{
    try{
        // console.log('fetching the yn polls')
        const ynpolls = await YnPoll.find()
        // console.log(ynpolls)
        res.status(200).json(ynpolls)
    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})

getPollRouter.get('/home/get-custom-poll',async(req,res,next)=>{
    try{
        const custompolls = await customPoll.find()
        res.status(200).json(custompolls)
    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})


module.exports = getPollRouter;