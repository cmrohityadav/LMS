import { Schema } from "mongoose";
import mongoose  from "mongoose";
import bcrypt from "bcryptjs"
import  Jwt from "jsonwebtoken";


const userSchema=new Schema({
    fullName:{
        type:String,
        required:[true,"Name is required"],
        minLength:[3,"Name must be atleast 3 char"],
        maxLength:[30,"Name cannot be greater than 30"],
        lowercase:true,
        trim:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"Name cannot be greater than 8"],
        select:false
},
avatar:{
    public_id:{
        type:String
    },
    secure_url:{
        type:String

    }
},
forgotPasswordToken:String,
forgotPasswordExpiry:Date,
role:{
    type:String,
    enum:['USER','ADMIN'],
    default: 'USER'
}


},{
    timestamps:true
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods={
    generateJwtToken: async function(){
        return  await Jwt.sign({
            id:this._id,
            email:this.email,
            subscriptions:this.subscriptions,
            role:this.role
        },
        process.env.JWT_SECRET,
        {
                expiresIn:process.env.JWT_EXPIRY

        })
        
    },
    comparePassword: async function(plainTextPassword){
            return await bcrypt.compare(plainTextPassword,this.password)
    }
}

 const User= mongoose.model("User",userSchema);
 export default User;