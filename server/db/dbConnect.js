import mongoose from "mongoose";
import { dbName } from "./dblms.js";
mongoose.set("strictQuery",false)

export const connectDB=async()=>{

    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`)
        console.log(`\n Mongodb connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error",error)
       
        process.exit(1) 
    }
}