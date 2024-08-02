const express = require('express')
const auth = require('../middleware/auth')
const CommentPoll = require('../models/commentPoll')
const YesNoPoll = require('../models/yesNoPoll')
const CustomPoll = require('../models/customPoll')
const User = require('../models/user')

const PollRouter = express.Router()


PollRouter.post('/user/add-comment-poll',auth,async(req,res,next)=>{
    try{
        const {question,commentphoto,color} = req.body
        const userid = req.user
        let commentpoll = new CommentPoll({
            userid : req.user,
            question,
            commentphoto,
            color,
            type : "comment",
        })
        // commentpoll.comments.push({
        //     voterid : "123",
        //     comment : "this is the comment added"
        // })
        commentpoll = await commentpoll.save();
        let user = await User.findById(userid)
        const postid = commentpoll['_id'].toString()
        user.posts.push(postid)
        await user.save()
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
        const userid = req.user
        let yesnopoll = new YesNoPoll({
            userid : req.user,
            question,
            color,
            type : "yn"
        })
        yesnopoll = await yesnopoll.save()
        let user = await User.findById(userid)
        const postid = yesnopoll['_id'].toString()
        user.posts.push(postid)
        await user.save()
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
        const userid = req.user
        let custompoll = new CustomPoll({
            userid : req.user,
            color,
            type,
            question,
            customphoto,
            options
        })
        custompoll = await custompoll.save()
        let user = await User.findById(userid)
        const postid = custompoll['_id'].toString()
        user.posts.push(postid)
        await user.save()
        res.status(200).json(custompoll)
    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})

PollRouter.post('/poll/inc-likes',auth,async(req,res,next)=>{
    try{
        const { pollid,type } = req.body
        let poll=null;
        if(type == "comment"){
            poll = await CommentPoll.findById(pollid)
        }else if(type == "yn"){
            poll = await YesNoPoll.findById(pollid)
        }else if(type == "Selection"){
            poll = await CustomPoll.findById(pollid)
        }
        poll.likes.push(req.user)
        let count = poll.likes.length;
        await poll.save()
        return res.status(200).json({
            count : count
        })
    }catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})

PollRouter.post('/poll/dec-likes',auth,async(req,res,next)=>{
    try{
        const { pollid,type } = req.body
        let poll=null;
        if(type == "comment"){
            poll = await CommentPoll.findById(pollid)
        }else if(type == "yn"){
            poll = await YesNoPoll.findById(pollid)
        }else if(type == "Selection"){
            poll = await CustomPoll.findById(pollid)
        }

        let index = poll.likes.indexOf(req.user)
        if(index>-1){
            poll.likes.splice(index,1)
        }
        let count = poll.likes.length;
        await poll.save()
        return res.status(200).json({
            count : count
        })
    }catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})




module.exports = PollRouter;