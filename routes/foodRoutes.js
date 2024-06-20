const express = require("express");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
} = require("../controllers/foodController");
const authMiddleWare = require("../middlewares/authMiddleWare");

const router = express.Router();
router.post("/create", authMiddleWare, createFoodController);
router.get("/getAll", getAllFoodsController);
router.get("/get/:id", getSingleFoodController);
router.get("/getByResturant/:id", getFoodByResturantController);
router.put("/update/:id", updateFoodController);
module.exports = router;
