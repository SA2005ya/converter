const express=require('express')
const router=express.Router()

const{shorturl,redirectUrl}=require('../controller/urlcontroller')

router.post('/short',shorturl);
router.get('/get/:shortcode',redirectUrl)
module.exports=router