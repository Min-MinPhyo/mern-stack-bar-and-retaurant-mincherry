const express=require("express")
const { getUserController,updateUserController,updatePasswordController,resetPasswordController, deleteUserController} = require("../controllers/userController")
const authMiddleWare = require("../middlewares/authMiddleWare")
const router=express.Router()


router.get("/getUser",authMiddleWare,getUserController)
router.put("/updateUser",authMiddleWare,updateUserController)
router.put("/resetPassword",authMiddleWare,resetPasswordController)
router.put("/updatePassword",authMiddleWare,updatePasswordController)
router.delete("/deleteUser/:id",authMiddleWare,deleteUserController)




module.exports=router