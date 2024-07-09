const jwt = require('jsonwebtoken')

const auth = async (req,res,next)=>{
    try{
        // console.log('in the auth middleware')
        const token = req.header('x-auth-token')
        if(!token){
            res.status(400).json({
                msg : 'No Token Found'
            })
        }
        const verified = jwt.verify(token,process.env.JWT_KEY)
        if(!verified){
            res.status(400).json({
                msg : 'jwt cannot be verified'
            })
        }

        req.user = verified.id
        req.token = token
        next()

    }catch(e){
        res.status(500).json({
            error : e.message
        })
    }
}

module.exports = auth;