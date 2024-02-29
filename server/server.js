import dotenv from "dotenv"
import { app } from "./app.js"
import { connectDB } from "./db/dbConnect.js"
dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT ,()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    })
    app.on("error",(error)=>{
        console.log("error",error);
        throw error
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err)

})

