const categoryModel = require("../models/categoryModel.js");

const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Title not found",
      });
    }

    const newCategory = new categoryModel({
      title,
      imageUrl,
    });

    await newCategory.save();

    res.status(201).send({
      success: true,
      message: "Category create successfully!",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Cat API",
      error,
    });
  }
};

const getAllCatController=async(req,res)=>{
    try {

        const categories=await categoryModel.find({})

        if(!categories){
            return res.status(500).send({
                success:false,
                message:"Category not found",

            })
        }


       res.status(200).send({
        success:true,
        message:"Get all cat successfully!",
        totalCat:categories.length
       })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Get All Cat API",
          error,
        });  
    }
}


const updateCatController=async(req,res)=>{

    try {

        const {id}=req.params
        const {title,imgUrl}=req.body


        const updateCategory=await categoryModel.findByIdAndUpdate(id,{title,imgUrl},{new:true})


        res.status(200).send({
            success:true,
            message:"Update category successfully!",
            updateCategory
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Update Cat API",
          error,
        });  
    }


}

const deleteCatController=async(req,res)=>{
    try {
        const { id } = req.params;
        if (!id) {
          return res.status(500).send({
            success: false,
            message: "Please provide Category ID",
          });
        }
        const category = await categoryModel.findById(id);
        if (!category) {
          return res.status(500).send({
            success: false,
            message: "No Category Found With this id",
          });
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
          success: true,
          message: "category Deleted succssfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Update Cat API",
          error,
        });  
    }
}

module.exports = { createCatController,getAllCatController,updateCatController,deleteCatController};
