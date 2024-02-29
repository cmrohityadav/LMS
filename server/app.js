import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app=express()

app.use(express.json({}))
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

app.use(cookieParser())
app.use(morgan("dev"))


// import router
import userRouter from "./routes/user.Router.js"
import errorMiddleware from "./middlewares/error.middleware.js";

// routes 
app.use('/api/v1/user',userRouter)



// testing routes
app.use('/ping',function(req,res){
    res.send("/pong")
    
})
// app.all("*",(req,res)=>{
//     res.status(404).send("OOPS !! 404 page not found")
// })

app.use(errorMiddleware)

export {app}
