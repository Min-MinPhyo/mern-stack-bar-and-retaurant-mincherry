
const mongoose = require("mongoose");

const connectDb =async()=>{
    await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Successfully connected ");
    })
    .catch((error) => {
      console.log(`can not connect to database, ${error}`);
    });
    
}


module.exports=connectDb