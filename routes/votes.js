const express = require('express')
const auth = require('../middleware/auth')
const CommentPoll = require('../models/commentPoll')
const YnPoll = require('../models/yesNoPoll')
const CustomPoll = require('../models/customPoll')
const User = require('../models/user')
const votesRouter = express.Router()



votesRouter.post('/user/add-comment',auth,async(req,res,next)=>{
    try{
        const { comment,pollid } = req.body
        const userid = req.user;
        let commentpoll =  await CommentPoll.findById(pollid)
        let user = await User.findById(userid)
        for(let i=0;i<user.votes.length;i++){
            if(user.votes[i]==pollid){
                return res.status(400).json({
                    msg : "You Have Already Passed on An Opinion"
                })
            }
        }
        commentpoll.comments.push({
            voterid : userid,
            comment : comment
        })
        user.votes.push(pollid)
        await commentpoll.save()
        await user.save()
        return res.status(200).json(user)
    }catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})

votesRouter.post('/user/add-yn-opinion',auth,async(req,res,next)=>{
    try{
        const { option,pollid } = req.body
        const userid = req.user
        let user = await User.findById(userid)
        
        for(let i=0;i<user.votes.length;i++){
            if(user.votes[i]==pollid){
                return res.status(400).json({
                    msg : "You Have Already Passed on An Opinion"
                })
            }
        }
        user.votes.push(pollid)
        let ynpoll = await YnPoll.findById(pollid)
        if(option==1){
            ynpoll.yesvotes.push(userid)
        }else{
            ynpoll.novotes.push(userid)
        }

        await user.save()
        await ynpoll.save()

        let yesvotes = ynpoll.yesvotes.length;
        let novotes = ynpoll.novotes.length;

        let totalvotes = yesvotes+novotes;


        res.status(200).json({
            yescount : yesvotes,
            totalvotes : totalvotes
        })

    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})


votesRouter.post('/user/custom-add-opinion',auth,async(req,res,next)=>{
    try{
        const { option,pollid,options } = req.body
        // console.log(option)
        let custompoll = await CustomPoll.findById(pollid)
        let user = await User.findById(req.user)
        for(let i=0;i<user.votes.length;i++){
            if(user.votes[i] == pollid){
                return res.status(400).json({
                    msg : "You Have Already Passed on An Opinion"
                })
            }
        }
        
        user.votes.push(pollid)

        custompoll.votes.push({
            voterid : req.user,
            option : option
        })

        await user.save()

        custompoll = await custompoll.save()

        var countvotes = {}

        for(let i=0;i<options.length;i++){
            countvotes[options[i]] = 0;
        }

        for(let i=0;i<custompoll.votes.length;i++){
            // console.log(custompoll.votes[i]['option'])
            countvotes[custompoll.votes[i]['option']] = countvotes[custompoll.votes[i]['option']] + 1
        }

        // console.log(countvotes)

        res.status(200).json({
            countedvotes : countvotes
        })

    }catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})


module.exports = votesRouter;