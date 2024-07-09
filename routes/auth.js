const express = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')



const authRouter = express.Router();

authRouter.post('/user/make-account',async(req,res,next)=>{
    try{
        const { email,password,cid,name } = req.body;

        const userByemail = await User.findOne({
            email : email
        })
        const userBycid = await User.findOne({
            cid : cid
        })

        if(userBycid || userByemail){
            res.status(400).json({
                msg : 'Account with same Email or College Id alrready exists'
            })
        }

        let hashedpasssword = await bcryptjs.hash(password,8)


        let user = new User({
            email,
            password : hashedpasssword,
            cid,
            name
        })

        user = await user.save()
        res.status(200).json(user)
    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})



authRouter.get('/user/sigin',async(req,res,next)=>{
    try{
        const username = req.header('username')
        const password = req.header('password')
        // console.log(username)
        const userbyemail = await User.findOne({
            email:username
        })
        const userbycid = await User.findOne({
            cid : username
        })

        if(userbyemail==null && userbycid==null){
            res.status(400).json({
                msg : 'Invalid username or colleged id'
            })
        }

        let user;
        if(userbyemail){
            user = userbyemail
        }else{
            user = userbycid
        }

        // console.log(user)

        bcryptjs.compare(password,user['password'],
        async (err,match)=>{
            if(match){
                const token = jwt.sign({id : user._id},process.env.JWT_KEY)
                return res.status(200).json({token,...user._doc});
            }else{
                return res.status(400).json({
                    msg : 'Password Doesnot match'
                })
            }
        })



    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
})


authRouter.get('/api/verify-token',async(req,res,next)=>{
    try{
        const token = req.header('x-auth-token')
        // console.log(`the token is ${token}`)
        if(!token){
            // console.log('false in 1')
            return res.json(false)
        }
        const verified = jwt.verify(token,process.env.JWT_KEY)
        if(!verified){
            // console.log('false in 2')
            return res.json(false)
        }
        const user = await User.findById(verified.id)
        if(!user){
            // console.log('false in 3')
            return res.json(false)
        }
        return res.json(true)
    }catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})

authRouter.get('/',auth,async(req,res,next)=>{
    try{
        // console.log('in the / route')
        const user = await User.findById(req.user)
        const token = req.token
        return res.status(200).json({
            token,
            ...user._doc
        })
    }catch(e){
        return res.status(500).json({
            error : e.message
        })
    }
})





module.exports = authRouter;