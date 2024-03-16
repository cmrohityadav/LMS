import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app=express()

app.use(express.json({}))
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

app.use(cookieParser())
app.use(morgan("dev"))

//cloudinary 
import {v2 as cloudinary} from 'cloudinary';         

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

// import router
import userRouter from "./routes/user.Router.js"
import courseRouter from "./routes/course.Router.js"
import paymentRouter from "./routes/payment.Router.js"
import errorMiddleware from "./middlewares/error.middleware.js";

// routes 
app.use('/api/v1/user',userRouter)
app.use('/api/v1/course',courseRouter)
app.use('/api/v1/course',paymentRouterRouter)



// testing routes
app.use('/ping',function(req,res){
    res.send("/pong")
    
})
// app.all("*",(req,res)=>{
//     res.status(404).send("OOPS !! 404 page not found")
// })

app.use(errorMiddleware)

export {app}
