import AppError from "../utils/error.util.js";

import  Jwt  from "jsonwebtoken";
const isLogged=async(req,res,next)=>{
        const {token}=req.cookies;
        // console.log("token",token)
        if(!token){
            return  next(new AppError("unAthorize Access please login or signup",400))
        }

        const userDetail= await Jwt.verify(token,process.env.JWT_SECRET)
        // console.log(userDetail)
        req.user=userDetail;

        next();




}

const authorizedRoles=(...roles)=>async(req,res,next)=>{
        const currentUserRole=req.user.role;
        if(!roles.includes(currentUserRole)){
            return next(
                new AppError("You do not have permission to acccess this route")
            )

        }
        next();
}
export {isLogged,authorizedRoles}