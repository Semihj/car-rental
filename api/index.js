import  mongoose  from "mongoose"
import dotenv from "dotenv";
import express from "express";
import AuthRouter from "./routes/auth.router.js"
import UserRouter from "./routes/user.router.js"
import CarRouter from "./routes/car.router.js"
import cookieParser from "cookie-parser";



dotenv.config();

const PORT = "3000"

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDb");

}).catch((err) => {
    console.log(err)
})

const app = express();

app.use(express.json());
app.use(cookieParser())
app.listen(PORT,() => {
    console.log("Server is running on port "+PORT )
})
app.use("/api/auth",AuthRouter)
app.use("/api/user",UserRouter)
app.use("/api/car",CarRouter)


 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });