const foodModel = require("../models/foodModel.js");
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturant,
      rating,
    } = req.body;

    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    if (!foods) {
      return res.status(404).send({
        success: fasle,
        message: "Food Not Found!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get All Foods",
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};

const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await foodModel.find({ resturant: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on restuatrn",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "food not found",
      });
    }

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(500).send({
        success: false,
        message: "food not found",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturant,
      rating,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturant,
        rating,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "update food successfully!",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Food Update API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
};
