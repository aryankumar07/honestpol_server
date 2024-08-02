const express = require('express');
const User = require('../models/user')
const CommentPoll = require('../models/commentPoll')
const YesNoPoll = require('../models/yesNoPoll')
const CustomPoll = require('../models/customPoll')
const auth = require('../middleware/auth')
const userRouter = express.Router();


userRouter.get('/home/get_user',async(req,res,next)=>{
    try{
        const userid = req.header('userid')
        const user = await User.findById(userid)
        res.status(200).json(user)
    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})

userRouter.get('/user/liked',auth,async(req,res,next)=>{
    try{
        const userid = req.user
        const pollid = req.header('pollid')
        const type = req.header('type')
        let poll=null;
        if(type == "comment"){
            poll = await CommentPoll.findById(pollid)
        }else if(type == "yn"){
            poll = await YesNoPoll.findById(pollid)
        }else if(type == "Selection"){
            poll = await CustomPoll.findById(pollid)
        }
        let found = false
        for(let i=0;i<poll.likes.length;i++){
            if(poll.likes[i]==userid){
                found = true
                break
            }
        }

        // console.log(pollid)
        // console.log(found)

        if(found){
            return res.status(200).json({
                found : "true"
            })
        }else{
            return res.status(200).json({
                found : "false"
            })
        }

    }catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})


module.exports = userRouter;