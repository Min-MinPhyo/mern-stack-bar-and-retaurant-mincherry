const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone,answer } = req.body;
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const existing = await userModel.findOne({ email: email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "This user email alredy exist",
      });
    }

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer
    });

    res.status(201).send({
      success: true,
      message: "Create register successfully!",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in register now",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Provide email and password",
      });
    }

    //checkuser
    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //check and compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid crendtisal error",
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully!",
      user,
      token,
    });

    user.password = undefined;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login now",
      error,
    });
  }
};


module.exports = { registerController, loginController };
