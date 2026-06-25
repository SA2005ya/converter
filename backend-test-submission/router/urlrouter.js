const express=require('express')
const router=express.Router()

const{shorturl}=require('../controller/urlcontroller')

router.post('/short',shorturl);
module.exports=router