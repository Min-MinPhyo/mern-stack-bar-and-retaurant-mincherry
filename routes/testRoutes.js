const express=require("express")
const { testController } = require("../controllers/testController")
const router=express.Router()


router.get("/testing",testController)



module.exports=router