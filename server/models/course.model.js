import { Schema } from "mongoose";
import mongoose from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required:[true,"Title is required"],
        minLength:[8,"title must be atleast 8 letter"],
        maxLength:[60,"title should be less than 60 letter"],
        trim:true,

    },
    discription: {
        type: String,
        required:[true,"discription is required"],
        minLength:[8,"discription  must be atleast 8 letter"],
        maxLength:[200,"discription  should be less than 60 letter"],
        trim:true,

    },
    category: {
        type: String,
        required:[true,"category is required"],
    },
    thumbnail: {
        public_id: {
            type: String,
            default:"Dummy"  ,
              // required:true          
        },
        secure_url: {
            type: String,
            default:"Dummy"  ,
            // required:true
        }
    },
    lectures: [
        {
            title: String,
            discription: String,

            lecture: {
                public_id: {
                    type: String,
                    default:"dummy",
                    required:true,
                },
                secure_url: {
                    type: String,
                    required:true,
                    default:"dummy"
                }
            }

        }
    ],
    numberOfLectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        required:true,
    }

}, {
    timestamps:true
})


const Course = mongoose.model("Course", courseSchema)
export default Course;
