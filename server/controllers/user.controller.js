import AppError from "../utils/error.util.js"
import User from "../models/user.model.js"
const cookieOptions={
    maxAge:24*60*60*1000,
    httpOnly:true,
    secure:true,
    

}
const register=async(req,res,next)=>{
    const {fullName,email,password}=req.body

    if(!fullName || !email || !password){
        return next(new AppError("all field is required",400))
    }

    const userExits= await User.findOne({email});
    if(userExits){
        return next(new AppError("User Exists",400))
    }

    const user= await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'https://avatars.githubusercontent.com/u/100376340?v=4'
        }
    })

    if(!user){
        return next(new AppError("User registration fail, try again",400))
    }

    // todo

    await user.save();

    user.password=undefined;

    const token= await user.generateJwtToken();
    res.cookie("token",token,cookieOptions)
    return res.status(201).json({
        success:true,
        message:"User Registred Successfull",
        user,
    })
}



const login=async(req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password){
        return next(new AppError("All fields are required",400))
    }

   try {
     const user= await User.findOne({email}).select("+password")
 
     if(!user || !user.comparePassword(password)){
         return next(new AppError("Password and email not right",400))
     }
 
     const token=await user.generateJwtToken();
     user.password=undefined;
 
     res.cookie("token",token,cookieOptions)
     return res.status(201).json({
         success:true,
         message:"User logged Successfull",
         user,
     })
 
   } catch (error) {
    return next(new AppError(error.message,500))
   }

}

const logout=(req,res,next)=>{
     res.cookie("token",null,{
        sucure:true,
        maxAge:0,
        httpOnly:true
     })
     .status(200).json({
        success:true,
        message:"User Logged Out successfulluy"
     })
}

const getProfile=async(req,res,next)=>{
    const userId=req.user.id;

    if(!userId){

        return  next(new AppError("unAthorize Access please login or signup",400))
    }

    const user=await User.findById(userId);

    if(!user){
        return  next(new AppError("unAthorize Access please login or signup",400))
    }

    return res.status(200).json({
        success:true,
        user,
        message:"successfully gotted detail"
    })

}
export {register,login,logout,getProfile}
