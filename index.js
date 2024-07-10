const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')

const app = express()

app.use(express.json())
app.use(authRouter)
app.use(profileRouter)

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


