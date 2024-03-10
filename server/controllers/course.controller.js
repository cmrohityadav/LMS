import { json } from "express";
import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary"
import fs from "fs"
const getAllCourses=async(req,res,next)=>{
      try {
         const  courses=await Course.find({}).select('-lectures');
  
         res.status(200).json({
           success:true,
           message:"all courses",
           courses,
         })
      } catch (error) {
        return next(
            new AppError(error.message)
        )

        
      }

}

const getLecturesByCourseId=async(req,res,next)=>{
try {
    const {id}=req.params;
    const course=await Course.findById(id);
    if(!course){
        return next(
            new AppError("Invalid Course Id",400)
        )
    }
    res.status(200).json({
        success:true,
        message:'Course lecture fetched successfully',
        lectures: course.lectures,

    })
    
} catch (error) {
    return next(
        new AppError(error.message)
    )

}

}

const createCourse=async(req,res,next)=>{
 const {title,discription,category,createdBy}=req.body
  if(!title || !discription || ! category || !createdBy){
    return next(
        new AppError("all fields are required",400)
    )
  }

 const course=await Course.create({
    title,
    discription,
    category,
    createdBy,
 })

 if(!course){
    return next(
        new AppError("course could not created please try again",400)
    )
 }

try {
     if(req.file){
        const result=await cloudinary.v2.uploader.upload(req.file.path,{
            folder:'lms'
        })
        console.log("result: ",result)
 
        if(result){
            course.thumbnail.public_id=result.public_id;
            course.thumbnail.secure_url=result.secure_url;
    
        }
     // remove from server
     fs.unlinkSync(`uploads/${req.file.filename}`)
    
        
     }
} catch (error) {
    return next(new AppError(error.message,500))
    
}

 await course.save();
 res.status(200).json({
    success:true,
    message:"Course created successfully",
    course
 })

}
const updateCourse=async(req,res,next)=>{

    try {
        const {id}=req.params;
        const course=await Course.findByIdAndUpdate(id,{
            $set:req.body
        },{
            runValidators:true
        })

        if(!course){
            return next(new AppError("Course with given id does not exists",500))
        }
        
        res.status(200).json({
            success:true,
            message:"Course Updatesuccessfully",
            course
         })
        
    } catch (error) {
        return next(new AppError(error.message,500))
    }
}

const removeCourse=async(req,res,next)=>{
  
    try {
        const {id}=req.params;
        const course= await Course.findById(id);

        if(!course){
            return next("course with given id does not exists",500)
        }

        await Course.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Course Successfully deleted",
           
         })
    } catch (error) {
        return next(new AppError(error.message,500)) 
    }
}

const addLectureToCourseById=async(req,res,next)=>{
    const {title,discription}=req.body;
    const {id}=req.params;
    if(!title || !discription ){
        return next(
            new AppError("all fields are required",400)
        )
      }
    const course=await Course.findById(id);

    if(!course){
        return next(new AppError("Course does not exits by given id",400)) 
    }

    const lectureData={
        title,
        discription,
        lecture:{},
    }

    if(req.file){
        try {
            if(req.file){
               const result=await cloudinary.v2.uploader.upload(req.file.path,
                {
                   folder:'lms',
                   resource_type: 'video',
               }
               )
             
               console.log("result->" , result)
               if(result){
                lectureData.lecture.public_id=result.public_id;
                lectureData.lecture.secure_url=result.secure_url;
           
               }
            // remove from server
            fs.unlinkSync(`uploads/${req.file.filename}`)
           
               
            }
       } catch (error) {
           return next(new AppError(error.message,500))
           
       }
    }

    course.lectures.push(lectureData);
    course.numberOfLectures=course.lectures.length;

    await course.save();

    res.status(200).json({
        success:true,
        message:"lecture succesufully added to course",
        course
    })


}

export {getAllCourses,getLecturesByCourseId,createCourse,updateCourse,removeCourse,addLectureToCourseById}