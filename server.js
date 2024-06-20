const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/db");
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

dotenv.config();

const PORT = process.env.PORT || 3000;
//database connection
connectDb();

//router call
const testRoutes = require("./routes/testRoutes.js");
const authRoutes = require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes")
const restaurantRoutes=require("./routes/restaurantRoutes")
const categoryRoutes=require("./routes/categoryRoutes")
const foodRoutes=require("./routes/foodRoutes")
//router use
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/restaurant",restaurantRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/food",foodRoutes)


app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`.white.bgCyan);
});
