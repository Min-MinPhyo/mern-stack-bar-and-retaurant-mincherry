const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  userType: {
    type: String,
    required: [true, "user type is required"],
    default: "client",
    enum: ["client", "admin", "vendor", "driver"],
  },
  profile: {
    type: String,
    default:
      "https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg",
  },
  answer:{
      type:String,
      required:[true,"Answer is required"]
  }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("userModel", userSchema);
