const express = require("express")
const app = express()
const logRoutes = require("./router/logRouter")
app.use(express.json())
app.use("/api/log", logRoutes)
app.listen(4000, ()=>{

    console.log("server running on 4000")

})