const express=require("express")
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require("../controllers/categoryController")
const authMiddleWare = require("../middlewares/authMiddleWare")
const router=express.Router()



router.post("/create",authMiddleWare,createCatController)
router.get("/getAll",getAllCatController)
router.put("/update/:id",authMiddleWare,updateCatController)
router.delete("/delete/:id",authMiddleWare,deleteCatController)





module.exports=router