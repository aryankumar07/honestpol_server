const express = require('express');
const User = require('../models/user')
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


module.exports = userRouter;