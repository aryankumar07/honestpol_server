const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')

const profileRouter = express.Router()

profileRouter.post('/user/save-profile-image',auth,async(req,res,next)=>{
    try{
        const { profilepic } = req.body
        console.log(profilepic)
        let user = await User.findById(req.user)
        user.profilepic = profilepic;
        user = await user.save();
        res.status(200).json(user)
    }catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})

profileRouter.post('/user/save-profile-name',auth,async(req,res,next)=>{
    try{
        const { name } = req.body
        console.log(name)
        let user = await User.findById(req.user)
        user.name = name;
        user = await user.save();
        res.status(200).json(user)
    }catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})


module.exports = profileRouter