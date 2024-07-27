const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const PollRouter = require('./routes/Poll')
const getPollRouter = require('./routes/getpolls');
const userRouter = require('./routes/user')

const app = express()

app.use(express.json())
app.use(authRouter)
app.use(profileRouter)
app.use(PollRouter)
app.use(getPollRouter)
app.use(userRouter)

mongoose.connect(process.env.DB)
.then(()=>{
    console.log('Connnection to database SuccessFull')
})
.catch((e)=>{
    console.log(e)
})

app.listen(PORT,()=>{
    console.log(`connection with ${PORT} is connected`)
})


