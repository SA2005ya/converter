const express=require('express')
const router=require('./router/urlrouter')
const Log=require('../logging-middleware/middleware/logger')
const app=express()
const cors=require('cors')
const port=3000
app.use(express.json())
app.use(cors())
app.use('/url',router)
app.listen(port,async()=>{
    await Log(
        "backend",
        "info",
        "server",
        `server created on ${port}`
    )
    console.log(`server running on ${port}`)
})
