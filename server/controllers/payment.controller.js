import { razorpay } from "../app.js"
import Payment from "../models/payment.model.js"
import User from "../models/user.model.js"
import AppError from "../utils/error.util.js"
const getRazorpayApiKey=async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"Razorpay API KEY",
        key: process.env.RAZORPAY_KEY_ID,
    })

}
const buySubscription=async(req,res,next)=>{
    const {id}=req.user
    const user=await User.findById(d)
    if(!user){
        return next(
            new AppError("UnAthorized , please loggin",400)
        )
    }

    if(user.role==="ADMIN"){
        return next(
            new AppError("Admin cannot purchase asubscription",400)
        )
    }
    const subscription=await razorpay.subscriptions.create({
        plan_id:process.env.RAZORPAY_PLAN_ID,
        customer_notify:1
    })

    user.subscription.id=subscription.id;
    user.subscription.status=subscription.status

    await user.save();
    res.status(200).json({
        success:true,
        message:"Subscribed Successfully",
        subscription_id:subscription.id
    })

}
const verifySubscription=async(req,res,next)=>{
    const {id}=req.user
    const {razorpay_payment_id,razorpay_signature,razorpay_subscripton_id}=req.body
    const user=await User.findById(d)
    if(!user){
        return next(
            new AppError("UnAthorized , please loggin",400)
        )
    }

    const subscriptionId=user.subscription.id;

    const generatedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${subscriptionId}`)
    .digest('hex')

    if(generatedSignature!==razorpay_signature){
        return next(
            new AppError("payment not verified, please try again",500)
        )
    }
    await Payment.create({
        razorpay_payment_id,
        razorpay_signature,
        razorpay_subscripton_id
    })

    user.subscription.status="active"
    await user.save();

    res.satus(200).json({
        success:true,
        message:"Payment verified Successfully"
    })

}
const cancleSubscription=async(req,res,next)=>{
    const {id}=req.user
    const user=await User.findById(d)
    if(!user){
        return next(
            new AppError("UnAthorized , please loggin",400)
        )
    }

    if(user.role==="ADMIN"){
        return next(
            new AppError("Admin cannot  unsubscription",400)
        )
    }

    const subscriptionId=user.subscription.id;
    const subscription=await razorpay.subscriptions.cancel({
        subscriptionId
    })

    user.subscription.status=subscription.status

    await user.save();



}
const allPayments=async(req,res,next)=>{
    const {count}=req.query
    const subscriptions= await razorpay.subscriptions.all({
        count:count ||10
    })

    res.status(200).json({
        success:true,
        message:"All Payment",
        Pa
    })
}

export {getRazorpayApiKey,buySubscription,verifySubscription,cancleSubscription,allPayments}